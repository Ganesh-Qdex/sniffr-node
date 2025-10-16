# PHP CRUD Demo

A simple PHP application that implements CRUD operations for a User entity.

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

1. Make sure you have PHP installed (8.0+ recommended)
2. Navigate to the PHP directory
3. Run: `php -S localhost:8000 index.php`
4. The application will start on http://localhost:8000

## Example Requests

Create a user:
```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

Get all users:
```bash
curl http://localhost:8000/api/users
```
