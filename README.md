# Ruby CRUD Demo

A simple Sinatra application that implements CRUD operations for a User entity.

## User Entity
- id: Integer (auto-generated)
- name: String
- email: String

## API Endpoints

- **GET** `/api/users` - Get all users
- **GET** `/api/users/{id}` - Get user by ID
- **POST** `/api/users` - Create a new user
- **PUT** `/api/users/{id}` - Update an existing user
- **DELETE** `/api/users/{id}` - Delete a user

## Running the Application

1. Make sure you have Ruby installed (2.7+ recommended)
2. Navigate to the Ruby directory
3. Install dependencies: `bundle install`
4. Run: `ruby app.rb`
5. The application will start on http://localhost:4567

## Example Requests

Create a user:
```bash
curl -X POST http://localhost:4567/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

Get all users:
```bash
curl http://localhost:4567/api/users
```
