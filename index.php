<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// In-memory storage for users (would be database in real app)
$users = [];
$nextId = 1;

// User class
class User {
    public $id;
    public $name;
    public $email;

    public function __construct($id, $name, $email) {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
    }

    public function toArray() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email
        ];
    }
}

// Get request body as JSON
function getRequestBody() {
    return json_decode(file_get_contents('php://input'), true);
}

// Get all users
function getAllUsers() {
    global $users;
    return array_values($users);
}

// Get user by ID
function getUserById($id) {
    global $users;
    return isset($users[$id]) ? $users[$id] : null;
}

// Create a new user
function createUser($data) {
    global $users, $nextId;

    if (!isset($data['name']) || !isset($data['email'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Name and email are required']);
        return null;
    }

    $user = new User($nextId, $data['name'], $data['email']);
    $users[$nextId] = $user;
    $nextId++;

    return $user;
}

// Update an existing user
function updateUser($id, $data) {
    global $users;

    if (!isset($users[$id])) {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
        return null;
    }

    if (!isset($data['name']) || !isset($data['email'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Name and email are required']);
        return null;
    }

    $user = new User($id, $data['name'], $data['email']);
    $users[$id] = $user;

    return $user;
}

// Delete a user
function deleteUser($id) {
    global $users;

    if (!isset($users[$id])) {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
        return false;
    }

    unset($users[$id]);
    return true;
}

// Parse the request URI
$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Remove query string
$path = parse_url($requestUri, PHP_URL_PATH);

// Route handling
if ($path === '/api/users' || $path === '/api/users/') {
    if ($requestMethod === 'GET') {
        $users = getAllUsers();
        echo json_encode($users);
    } elseif ($requestMethod === 'POST') {
        $data = getRequestBody();
        $user = createUser($data);
        if ($user) {
            http_response_code(201);
            echo json_encode($user->toArray());
        }
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
} elseif (preg_match('/^\/api\/users\/(\d+)$/', $path, $matches)) {
    $id = (int)$matches[1];

    if ($requestMethod === 'GET') {
        $user = getUserById($id);
        if ($user) {
            echo json_encode($user->toArray());
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
        }
    } elseif ($requestMethod === 'PUT') {
        $data = getRequestBody();
        $user = updateUser($id, $data);
        if ($user) {
            echo json_encode($user->toArray());
        }
    } elseif ($requestMethod === 'DELETE') {
        if (deleteUser($id)) {
            http_response_code(204);
        }
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
} elseif ($path === '/' || $path === '') {
    echo json_encode(['message' => 'CRUD Demo API is running!']);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
}

?>
