'use client';

import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import { useState, useEffect } from 'react';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:3001/api/users');
    const data = await response.json();
    setUsers(data);
  };

  // BUG: Issue5 - Data fetching can be unreliable
  useEffect(() => {
    let ignore = false;
    fetchUsers();
    return () => { ignore = true };
  }, []);

  // BUG: Issue8 - Form submissions can cause unexpected behavior
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
      const newUser = await response.json();
      // BUG: Issue1 - State management issue
      setUsers(users.push(newUser));
      setName('');
      setEmail('');
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add User
          </button>
        </div>
      </form>

      <div className="grid gap-4">
        {users.map((user: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; email: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
          <div key={user.id} className="border p-4 rounded">
            <h3 className="font-bold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
