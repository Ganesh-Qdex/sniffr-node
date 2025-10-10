# Multi-Language CRUD Demo Repository

This repository contains CRUD (Create, Read, Update, Delete) implementations for a simple User entity in six different programming languages:

- **Java** - Spring Boot application
- **Python** - Flask application
- **Ruby** - Sinatra application
- **Node.js** - Express.js application
- **Go** - Standard library HTTP server
- **PHP** - Plain PHP with built-in server

## User Entity

All implementations provide the same functionality for a User entity with the following fields:
- `id`: Auto-generated unique identifier
- `name`: User's name (string)
- `email`: User's email address (string)

## API Endpoints

Each implementation provides the same REST API endpoints:

- `GET /api/users` - Retrieve all users
- `GET /api/users/{id}` - Retrieve a specific user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/{id}` - Update an existing user
- `DELETE /api/users/{id}` - Delete a user

## Request/Response Format

All endpoints use JSON for request and response bodies.

### Create/Update User Request
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### User Response
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Running Each Implementation

Navigate to each language directory and follow the instructions in their respective README files:

### Java (Spring Boot)
- Port: 8080
- Command: `mvn spring-boot:run`

### Python (Flask)
- Port: 5000
- Command: `python app.py`

### Ruby (Sinatra)
- Port: 4567
- Command: `ruby app.rb`

### Node.js (Express)
- Port: 3000
- Command: `npm start`

### Go (Standard Library)
- Port: 8081
- Command: `go run main.go`

### PHP (Plain PHP)
- Port: 8000
- Command: `php -S localhost:8000 index.php`

## Example Usage

Once any server is running, you can test the API:

```bash
# Create a user
curl -X POST http://localhost:{port}/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'

# Get all users
curl http://localhost:{port}/api/users

# Get user by ID
curl http://localhost:{port}/api/users/1

# Update user
curl -X PUT http://localhost:{port}/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com"}'

# Delete user
curl -X DELETE http://localhost:{port}/api/users/1
```

## Architecture Notes

- All implementations use in-memory storage (no database)
- Data persists only during server runtime
- Each implementation demonstrates language/framework-specific patterns
- All follow RESTful API conventions
- Error handling is implemented consistently across languages
