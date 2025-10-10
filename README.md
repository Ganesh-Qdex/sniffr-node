# Python CRUD Demo

A simple Flask application that implements CRUD operations for a User entity.

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

1. Make sure you have Python 3.8+ installed
2. Navigate to the Python directory
3. Install dependencies: `pip install -r requirements.txt`
4. Run: `python app.py`
5. The application will start on http://localhost:5000

## Example Requests

Create a user:
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

Get all users:
```bash
curl http://localhost:5000/api/users
```
