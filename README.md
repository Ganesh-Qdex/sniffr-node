# React Native CRUD Application

A modern, cross-platform mobile task management application built with React Native, featuring native UI components and full CRUD operations.

## Features

- ✅ **Create** new tasks with title, description, and priority
- 📖 **Read** and view all tasks with native UI
- ✏️ **Update** existing tasks
- 🗑️ **Delete** tasks with native confirmation dialogs
- 🎨 **Material Design** UI with React Native Paper
- 📱 **Cross-platform** support for iOS and Android
- 💾 **AsyncStorage** persistence
- 🏷️ **Priority System** (High, Medium, Low)
- ✅ **Task Completion** tracking
- 🔄 **Pull-to-refresh** functionality
- 📊 **Task Statistics** in the header

## Technologies Used

- **React Native 0.72** - Cross-platform mobile development
- **React Native Paper** - Material Design components
- **AsyncStorage** - Local data persistence
- **React Navigation** - Navigation (ready for expansion)
- **Vector Icons** - Beautiful icons
- **UUID** - Unique ID generation

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Navigate to the project directory:
   ```bash
   cd react-native-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. For iOS, install pods:
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the Application

#### Android
```bash
npm run android
```

#### iOS
```bash
npm run ios
```

#### Development Server
```bash
npm start
```

## Project Structure

```
react-native-app/
├── android/                 # Android-specific files
├── ios/                    # iOS-specific files
├── App.js                  # Main application component
├── index.js               # Application entry point
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## Key Features

### Task Management
- **Add Tasks**: Create new tasks with title, description, and priority
- **Edit Tasks**: Modify existing tasks
- **Delete Tasks**: Remove tasks with confirmation
- **Complete Tasks**: Mark tasks as complete/incomplete
- **Priority Levels**: High, Medium, Low with color coding

### User Interface
- **Material Design**: Modern, native-looking interface
- **Responsive Layout**: Adapts to different screen sizes
- **Smooth Animations**: Native feel with React Native Paper
- **Intuitive Navigation**: Easy-to-use interface

### Data Persistence
- **AsyncStorage**: Local storage for offline functionality
- **Automatic Save**: Changes are saved immediately
- **Data Recovery**: Tasks persist between app sessions

## Customization

### Styling
The application uses React Native Paper's theming system. You can customize colors, fonts, and spacing by modifying the theme.

### Adding New Features
- Add new task properties in the form data
- Update the form UI in the modal
- Modify the task display components
- Add new validation rules

### Platform-Specific Features
- **Android**: Material Design components
- **iOS**: Native iOS styling and interactions

## Dependencies

### Core Dependencies
- `react-native`: Core React Native framework
- `react-native-paper`: Material Design components
- `@react-native-async-storage/async-storage`: Local storage
- `react-native-vector-icons`: Icon library
- `react-native-uuid`: UUID generation

### Development Dependencies
- `@babel/core`: Babel transpiler
- `eslint`: Code linting
- `jest`: Testing framework
- `metro`: React Native bundler

## Building for Production

### Android
```bash
cd android
./gradlew assembleRelease
```

### iOS
```bash
cd ios
xcodebuild -workspace YourApp.xcworkspace -scheme YourApp -configuration Release
```

## Performance Considerations

- **FlatList**: Efficient rendering of large task lists
- **AsyncStorage**: Non-blocking data persistence
- **Optimized Re-renders**: Proper state management
- **Memory Management**: Efficient component lifecycle

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **Android build issues**: Clean and rebuild with `cd android && ./gradlew clean`
3. **iOS build issues**: Clean Xcode build folder and rebuild
4. **Dependency issues**: Delete `node_modules` and reinstall

### Debug Mode
- Enable debug mode in React Native debugger
- Use Flipper for advanced debugging
- Check console logs for errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both platforms
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support and questions:
- Check the React Native documentation
- Review React Native Paper documentation
- Open an issue in the repository
