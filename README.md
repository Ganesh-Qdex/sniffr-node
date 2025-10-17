# React CRUD Application

A modern, responsive task management application built with React, featuring a beautiful UI and full CRUD operations.

## Features

- ✅ **Create** new tasks with title, description, priority, and due date
- 📖 **Read** and view all tasks with filtering and sorting
- ✏️ **Update** existing tasks
- 🗑️ **Delete** tasks with confirmation
- 🎨 **Modern UI** with gradient backgrounds and smooth animations
- 📱 **Responsive Design** that works on all devices
- 💾 **Local Storage** persistence
- 🏷️ **Priority System** (High, Medium, Low)
- ✅ **Task Completion** tracking
- 📊 **Statistics Dashboard** showing task counts

## Technologies Used

- **React 18** - Modern React with hooks
- **CSS3** - Custom styling with gradients and animations
- **Lucide React** - Beautiful icons
- **Local Storage** - Data persistence
- **Responsive Design** - Mobile-first approach

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd react-web-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Project Structure

```
react-web-app/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main application component
│   ├── App.css         # Application-specific styles
│   ├── index.js        # Application entry point
│   └── index.css       # Global styles
├── package.json
└── README.md
```

## Key Components

### App.js
- Main application component
- State management for tasks
- CRUD operations
- Modal handling
- Form validation

### Features Implemented

1. **Task Management**
   - Add new tasks with form validation
   - Edit existing tasks
   - Delete tasks with confirmation
   - Mark tasks as complete/incomplete

2. **User Interface**
   - Modern gradient design
   - Responsive layout
   - Smooth animations and transitions
   - Intuitive user experience

3. **Data Persistence**
   - Local storage integration
   - Automatic save/load functionality

4. **Task Properties**
   - Title (required)
   - Description (optional)
   - Priority level (High, Medium, Low)
   - Due date (optional)
   - Completion status
   - Creation and update timestamps

## Customization

### Styling
The application uses custom CSS with CSS variables for easy theming. You can modify colors, fonts, and spacing in the CSS files.

### Adding New Features
- Add new task properties in the form data
- Update the form UI in the modal
- Modify the task display components
- Add new validation rules

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).
