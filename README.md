# Go CRUD Demo

A simple Go application using the standard library that implements CRUD operations for a User entity.

## User Entity
- id: int (auto-generated)
- name: string
- email: string

## API Endpoints

- **GET** `/api/users` - Get all users
- **GET** `/api/users/{id}` - Get user by ID
- **POST** `/api/users` - Create a new user
- **PUT** `/api/users/{id}` - Update an existing user
- **DELETE** `/api/users/{id}` - Delete a user

## Running the Application

1. Make sure you have Go installed (1.21+ recommended)
2. Navigate to the Go directory
3. Run: `go run main.go`
4. The application will start on http://localhost:8081

## Example Requests

Create a user:
```bash
curl -X POST http://localhost:8081/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

Get all users:
```bash
curl http://localhost:8081/api/users
```
