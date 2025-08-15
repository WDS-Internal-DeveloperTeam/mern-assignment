# Assignment: Backend Refactor and Feature Extension

## Overview
You are given a Node.js/Express backend for a simple blog app (see `index.js`). The current implementation uses PostgreSQL. Your task is to:

1. **Convert the backend to use MongoDB (with Mongoose) instead of PostgreSQL.**
2. **Resolve all existing bugs in the backend code.**
3. **Implement a new feature: Add support for updating a blog post.**

---

## Details

### 1. Convert to MongoDB
- Remove all PostgreSQL (`pg` package) code and dependencies.
- Use Mongoose to connect to a local MongoDB instance (database: `blog`).
- Define a Mongoose model for blog posts with fields: `title` (string), `content` (string).
- Update all routes to use Mongoose queries instead of SQL.

### 2. Bug Fixes
- Fix all logic, error handling, and security bugs in the backend code. (Hint: Review input validation, error responses, and async handling.)

### 3. New Feature: Update Post
- Implement a `PUT /posts/:id` endpoint to update the `title` and `content` of a post by its ID.
- Validate input and return appropriate responses for success and error cases.

---

## Submission
- Submit your updated `index.js` and any new files you create.
- Include a short `README.md` describing how to run the backend with MongoDB.

---

Good luck! If you have questions, ask your interviewer for clarification.
