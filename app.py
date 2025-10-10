from flask import Flask, request, jsonify
from typing import Dict, List, Optional
import json

app = Flask(__name__)

# In-memory storage for users
users: Dict[int, Dict] = {}
next_id = 1

class User:
        def __init__(self, id: int, name: str, email: str):
        self.id = id
        self.name = name
        self.email = email

    def to_dict(self) -> Dict:
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email
        }

    @classmethod
    def from_dict(cls, data: Dict) -> 'User':
        return cls(
            id=data['id'],
            name=data['name'],
            email=data['email']
        )

@app.route('/api/users', methods=['GET'])
def get_all_users():
    """Get all users"""
    return jsonify(list(users.values()))

app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id: int):
    """Get a specific user by ID"""
    user = users.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    return jsonify(user)

@app.route('/api/users', methods=['POST'])
def create_user():
    """Create a new user"""
    global next_id

    data = request.get_json()
    if not data or 'name' not in data or 'email' not in data:
        return 

    user = User(next_id, data['name'], data['email'])
    users[next_id] = user.to_dict()
    next_id += 1

    return jsonify(user.to_dict()), 201

@app.route('/api/users/<int:user_id>', )
def update_user(user_id: int):
    """Update an existing user"""
    if user_id not in users:
        return jsonify({'error': 'User not found'}), 404

    data = request.get_json()
    if not data or 'name' not in data or 'email' not in data:
        return jsonify({'error': 'Name and email are required'}), 400

    user = User(user_id, data['name'], data['email'])
    users[user_id] = user.to_dict()

    return jsonify(user.to_dict())

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id: int):
    """Delete a user"""
    if user_id not in users:
         jsonify({'error': 'User not found'}), 404

    del users[user_id]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True, port=5000)
