# MERN + Next.js Q\&A

This document contains **80 questions** divided into **Senior (40 Q\&A)** and **Junior (40 Q\&A)** categories, covering Node.js, React, Next.js, databases, system design, deployment, and production issues.

---

## Senior-Level (40 Q\&A)

### Node.js, React & Next.js (Advanced, Performance) - 25 Q\&A

1. **Node.js Event Loop**
   **Answer:** Handles async callbacks; I/O offloaded to libuv.
   **Pitfall/Tip:** CPU-heavy tasks block the loop; use Worker Threads.

2. **CPU-intensive tasks**
   **Answer:** Offload to Worker Threads or microservices.
   **Pitfall:** Forking multiple Node processes without stateless code can cause data inconsistency.

3. **process.nextTick vs setImmediate**
   **Answer:** `nextTick` runs before I/O; `setImmediate` after.
   **Pitfall:** Overuse of `nextTick` can starve I/O.

4. **Streams**
   **Answer:** Stream data to avoid memory bloat.
   **Pitfall:** Forgetting to handle 'error' events can crash the server.

5. **Cluster vs Worker Threads**
   **Answer:** Cluster: multiple processes; Worker Threads: threads in same process.
   **Pitfall:** Worker Threads share memory, risk of race conditions.

6. **Memory leak debugging**
   **Answer:** Use heap snapshots, `clinic.js`, Chrome DevTools.
   **Tip:** Look for unremoved event listeners or closures holding large objects.

7. **Caching in Node.js**
   **Answer:** Use Redis or memory cache.
   **Pitfall:** Cache invalidation is hard; stale data can mislead clients.

8. **React Fiber**
   **Answer:** Breaks rendering into chunks for responsiveness.
   **Trick:** Long-running effects can still block UI; use `startTransition`.

9. **React batching**
   **Answer:** Groups state updates; React 18 batches async updates too.
   **Pitfall:** Expecting immediate state update in async callbacks may fail.

10. **memo, useCallback, useMemo**
    **Answer:** Prevent unnecessary re-renders and recalculations.
    **Trick:** Overuse adds complexity; small components don’t benefit.

11. **Suspense & concurrent features**
    **Answer:** Allows async rendering without blocking.
    **Pitfall:** Only works with compatible data-fetching libraries.

12. **Large lists**
    **Answer:** Use virtualization (`react-window`).
    **Trick:** Forgetting unique keys causes bugs on reorder.

13. **SSR pitfalls**
    **Answer:** Hydration mismatch.
    **Trick:** Random IDs or date/time rendering on server vs client break SSR.

14. **Stale closures**
    **Answer:** Use refs or dependency array in `useEffect`.
    **Pitfall:** Forgetting dependencies causes old state/props to be used.

15. **Controlled vs uncontrolled components**
    **Answer:** Controlled: React manages state; Uncontrolled: DOM.
    **Trick:** Mixing them leads to unpredictable behavior.

16. **Bundle optimization**
    **Answer:** Tree shaking, code splitting.
    **Pitfall:** Improper dynamic imports can increase initial load.

17. **Lazy loading**
    **Answer:** Use `React.lazy` or Intersection Observer.
    **Trick:** Suspense fallback UI must handle loading states correctly.

18. **WebSockets efficiency**
    **Answer:** Limit connections, ping/pong, sticky sessions.
    **Pitfall:** Memory leaks if sockets aren’t cleaned on disconnect.

19. **Over/under-fetching**
    **Answer:** GraphQL or REST query params.
    **Trick:** Over-fetching slows mobile clients; under-fetching causes multiple requests.

20. **Debouncing/throttling**
    **Answer:** Limit frequent calls.
    **Pitfall:** Choosing wrong interval causes poor UX or performance issues.

21. **Next.js SSR & SSG**
    **Answer:** SSR renders page on each request; SSG pre-renders at build time.
    **Trick:** Using SSR when static would suffice wastes server resources.

22. **Next.js ISR**
    **Answer:** Incremental Static Regeneration updates static pages after specified intervals.
    **Pitfall:** Misconfiguring revalidate can serve stale data longer than expected.

23. **Next.js API Routes**
    **Answer:** Create backend endpoints in `pages/api`.
    **Trick:** Avoid heavy computation in API routes; use serverless-friendly patterns.

24. **Image Optimization**
    **Answer:** Use `next/image` with lazy loading, resizing.
    **Pitfall:** Overusing default loader can increase server CPU; configure external loader for CDN.

25. **Next.js Middleware**
    **Answer:** Runs before request reaches route; good for auth, redirects.
    **Trick:** Avoid long-running middleware; it blocks request.

### Databases, System Design & Deployment - 15 Q\&A

26. **SQL vs NoSQL**
    **Answer:** SQL: ACID, relational; NoSQL: scalable, flexible schema.
    **Pitfall:** Using NoSQL for complex joins or strict transactions can cause bugs.

27. **Normalization vs Denormalization**
    **Answer:** Normalize to reduce redundancy; denormalize for read-heavy queries.
    **Trick:** Over-normalization increases joins, hurting performance.

28. **Indexing in SQL**
    **Answer:** Speeds up reads; slows writes and increases storage.
    **Pitfall:** Too many indexes or wrong columns can degrade performance.

29. **MongoDB transactions**
    **Answer:** Multi-document ACID transactions exist.
    **Trick:** Heavy transactions can hurt performance.

30. **Embedded vs References**
    **Answer:** Embed for fast read, reference for normalized relationships.
    **Pitfall:** Embedding large arrays can hit document size limits.

31. **High-read/write schema in MongoDB**
    **Answer:** Use sharding, indexes, proper data modeling.
    **Trick:** Wrong shard key creates hotspots.

32. **Aggregation pipeline**
    **Answer:** `$match`, `$group`, `$project` transform and filter data.
    **Pitfall:** `$lookup` on large collections without indexes is slow.

33. **Many-to-many relationships**
    **Answer:** SQL: join tables; MongoDB: array of references or linking collection.
    **Trick:** Avoid embedding arrays that grow indefinitely.

34. **Sharding pitfalls**
    **Answer:** Distributes data across shards.
    **Pitfall:** Low-cardinality or monotonically increasing keys → unbalanced load.

35. **Data consistency SQL & MongoDB**
    **Answer:** Use transactions, write concern, or versioning.
    **Trick:** Assuming eventual consistency is immediate leads to subtle bugs.

36. **Optimizing large queries**
    **Answer:** Indexing, projection, limit/skip carefully.
    **Pitfall:** Using skip on large offsets can be slow; use range queries or cursors.

37. **Optimistic vs pessimistic locking**
    **Answer:** Optimistic: check version; Pessimistic: lock rows.
    **Trick:** Optimistic fails silently if version mismatch; must handle retry logic.

38. **N+1 problem**
    **Answer:** Batch queries or join tables.
    **Trick:** Lazy-loading related data per row multiplies queries exponentially.

39. **Caching with Redis**
    **Answer:** Cache frequent queries or computed results.
    **Pitfall:** Stale cache; must implement invalidation strategy.

40. **MongoDB migrations**
    **Answer:** Use versioned scripts or batching.
    **Trick:** Large collections require incremental updates; otherwise downtime occurs.

---

## Junior-Level (40 Q\&A)
# Junior-Level MERN + Next.js Q&A (40 Questions)

## Node.js & Express – 10 Q&A

1. **What is Node.js?**  
   **Answer:** JavaScript runtime on the server.  

2. **Explain the event loop simply.**  
   **Answer:** Handles asynchronous operations in a queue.  

3. **Difference between `require` and `import`.**  
   **Answer:** `require` is CommonJS; `import` is ES6 module syntax.  

4. **What is npm?**  
   **Answer:** Node Package Manager to install and manage packages.  

5. **What is Express.js?**  
   **Answer:** Node.js framework for building APIs and web servers.  

6. **How to handle 404 errors in Express?**  
   **Answer:** Use middleware: `app.use((req, res) => res.status(404).send('Not Found'))`.  

7. **What is middleware in Express?**  
   **Answer:** Functions that run before route handlers to process requests.  

8. **Difference between `res.send()` and `res.json()`.**  
   **Answer:** `res.json()` sets JSON headers; `res.send()` can send strings, objects, or buffers.  

9. **How to read POST data in Express?**  
   **Answer:** Use `express.json()` or `express.urlencoded()` middleware.  

10. **Basic async error handling in Node.js**  
    **Answer:** Use try/catch inside async functions or `.catch()` for promises.  

---

## React.js – 10 Q&A

11. **What is React?**  
    **Answer:** A library for building interactive UIs with reusable components.  

12. **What is JSX?**  
    **Answer:** JavaScript syntax extension that looks like HTML for defining UI elements.  

13. **Difference between state and props.**  
    **Answer:** State is local and mutable; props are passed from parent and immutable.  

14. **What is a functional component?**  
    **Answer:** A JS function that returns JSX.  

15. **What is a class component?**  
    **Answer:** ES6 class that extends React.Component with lifecycle methods.  

16. **Explain `useState` hook.**  
    **Answer:** Hook to add state to functional components.  

17. **Explain `useEffect` hook.**  
    **Answer:** Hook to run side effects like data fetching or subscriptions.  

18. **What is lifting state up?**  
    **Answer:** Moving shared state to a common parent to pass as props.  

19. **Controlled vs uncontrolled inputs.**  
    **Answer:** Controlled: React manages the input value; Uncontrolled: DOM manages it.  

20. **How to conditionally render in React?**  
    **Answer:** Use ternary operators, `&&`, or conditional components in JSX.  

---

## Next.js – 5 Q&A

21. **What is Next.js?**  
    **Answer:** React framework for SSR, SSG, routing, and API routes.  

22. **Difference between SSR and CSR.**  
    **Answer:** SSR: server renders HTML; CSR: client renders UI after JS loads.  

23. **What is `getStaticProps`?**  
    **Answer:** Fetches data at build time for static pages.  

24. **What is `getServerSideProps`?**  
    **Answer:** Fetches data on every request for server-side rendered pages.  

25. **How does routing work in Next.js?**  
    **Answer:** File-based routing: pages folder defines routes automatically.  

---

## Databases – 5 Q&A

26. **Difference between SQL and NoSQL.**  
    **Answer:** SQL is structured and ACID-compliant; NoSQL is flexible and scalable.  

27. **What is a primary key?**  
    **Answer:** Unique identifier for each record in a table.  

28. **What is a foreign key?**  
    **Answer:** Reference to a primary key in another table.  

29. **How to insert a document in MongoDB?**  
    **Answer:** `db.collection.insertOne({ name: "John" })`  

30. **Difference between `findOne` and `find` in MongoDB.**  
    **Answer:** `findOne` returns a single document; `find` returns multiple documents.  

---

## Basic Algorithms & Logic – 5 Q&A

31. **How to reverse a string in JavaScript?**  
    **Answer:** `str.split('').reverse().join('')`  

32. **How to find the maximum number in an array?**  
    **Answer:** `Math.max(...arr)`  

33. **What is a loop?**  
    **Answer:** Repeats a block of code multiple times (`for`, `while`).  

34. **Difference between `==` and `===`.**  
    **Answer:** `==` compares value with type coercion; `===` compares value and type.  

35. **How to remove duplicates from an array?**  
    **Answer:** `[...new Set(arr)]`  

---

## Deployment & Basic Production – 5 Q&A

36. **How to start a Node.js server?**  
    **Answer:** `node index.js` or `npm start`  

37. **What is an environment variable?**  
    **Answer:** Key-value pair for configuration, accessed via `process.env`.  

38. **Basic way to deploy a Next.js app?**  
    **Answer:** Vercel, Netlify, or any Node.js hosting platform.  

39. **How to handle a 404 page in Next.js?**  
    **Answer:** Create `pages/404.js` with a custom component.  

40. **How to monitor errors in React/Next.js apps?**  
    **Answer:** Use `console.error`, Sentry, or browser dev tools.  

