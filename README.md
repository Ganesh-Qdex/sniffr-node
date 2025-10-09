# Node.js CRUD Demo

A simple Express.js application that implements CRUD operations for a User entity.

## User Entity
- id: Number (auto-generated)
- name: String
- email: String

## API Endpoints

- **GET** `/api/users` - Get all users
- **GET** `/api/users/{id}` - Get user by ID
- **POST** `/api/users` - Create a new user
- **PUT** `/api/users/{id}` - Update an existing user
- **DELETE** `/api/users/{id}` - Delete a user

## Running the Application

1. Make sure you have Node.js installed (16+ recommended)
2. Navigate to the Node.js directory
3. Install dependencies: `npm install`
4. Run: `npm start` or `node app.js`
5. The application will start on http://localhost:3000

## Example Requests

Create a user:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

Get all users:
```bash
curl http://localhost:3000/api/users
```
