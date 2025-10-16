# Java CRUD Demo

A simple Spring Boot application that implements CRUD operations for a User entity.

## User Entity
- id: Long (auto-generated)
- name: String
- email: String

## API Endpoints

- **GET** `/api/users` - Get all users
- **GET** `/api/users/{id}` - Get user by ID
- **POST** `/api/users` - Create a new user
- **PUT** `/api/users/{id}` - Update an existing user
- **DELETE** `/api/users/{id}` - Delete a user

## Running the Application

1. Make sure you have Java 17+ and Maven installed
2. Navigate to the Java directory
3. Run: `mvn spring-boot:run`
4. The application will start on http://localhost:8080

## Example Requests

Create a user:
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

Get all users:
```bash
curl http://localhost:8080/api/users
```
