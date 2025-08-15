// React frontend for blog app (intentionally buggy)
import React, { useEffect, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Bug: fetch not awaited, possible race condition
  useEffect(() => {
    fetch('http://localhost:4000/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  // Bug: No error handling, no input validation
  const addPost = () => {
    fetch('http://localhost:4000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    })
      .then(res => res.json())
      .then(post => setPosts([...posts, post]));
    setTitle('');
    setContent('');
  };

  // Bug: UI not updated after delete
  const deletePost = (id) => {
    fetch(`http://localhost:4000/posts/${id}`, { method: 'DELETE' });
  };

  return (
    <div>
      <h1>Blog</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
      <button onClick={addPost}>Add Post</button>
      <ul>
        {posts?.map(post => (
          <li key={post.id}>
            <b>{post.title}</b>: {post.content}
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
