const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory storage for users
let users = {};
let nextId = 1;

class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email
        };
    }
}

// GET /api/users - Get all users
app.get('/api/users', (req, res) => {
    res.json(Object.values(users));
});

// GET /api/users/:id - Get user by ID
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users[userId];

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
});

// POST /api/users - Create a new user
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const user = new User(nextId, name, email);
    users[nextId] = user.toJSON();
    nextId++;

    res.status(201).json(user.toJSON());
});

// PUT /api/users/:id - Update an existing user
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;

    if (!users[userId]) {
        return res.status(404).json({ error: 'User not found' });
    }

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const user = new User(userId, name, email);
    users[userId] = user.toJSON();

    res.json(user.toJSON());
});

// DELETE /api/users/:id - Delete a user
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    if (!users[userId]) {
        return res.status(404).json({ error: 'User not found' });
    }

    delete users[userId];
    res.status(204).send();
});

// Health check
app.get('/', (req, res) => {
    res.send('CRUD Demo API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
