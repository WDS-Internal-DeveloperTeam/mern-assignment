# Debugging Practice Project

This is a full-stack Next.js + Express + PostgreSQL project containing 3-4 intentional bugs for interview practice.

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```
   PGURL=postgres://your_connection_string_here
   PORT=3001
   ```

4. Start the backend server:
   ```bash
   npm run server
   ```

5. In a new terminal, start the frontend:
   ```bash
   npm run dev
   ```

## The Challenge

This is a full-stack application with several bugs that need to be fixed. You have 30-35 minutes to identify and fix as many issues as you can find.

The bugs range from simple to complex and may involve:
- Frontend functionality
- Backend operations
- Database interactions
- Application configuration
- Performance issues
- Error handling

### Success Criteria
- Users should load correctly on the homepage
- You should be able to add a new user
- The app should handle duplicate email addresses gracefully
- All database operations should work correctly

### Deliverable
Create a new branch named `fix-yourname` with your solutions and push it to the repository.

## Project Structure
- `/src/app` - Next.js frontend
- `/server` - Express backend
- `/server/db` - Database configuration and queries

Good luck!
