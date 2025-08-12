# Contributing to Quick Folder Launcher

Thank you for your interest in contributing to Quick Folder Launcher! This document provides guidelines and instructions for contributing to both the desktop and mobile versions of the application.

## 🚀 Getting Started

### Development Environment Setup

#### Desktop App (Electron)
```bash
# Clone the repository
git clone https://github.com/your-username/quick-folder-launcher.git
cd quick-folder-launcher

# Install dependencies
npm install

# Run in development mode
npm run dev
```

#### Mobile App (React Native)
```bash
# Navigate to mobile app directory
cd ios-app

# Install dependencies
npm install

# For iOS (requires macOS)
cd ios && pod install && cd ..
npx react-native run-ios

# For Android
npx react-native run-android
```

## 📝 Development Guidelines

### Code Style
- Use consistent indentation (2 spaces)
- Follow existing naming conventions
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable and function names

### Desktop App Guidelines
- Use modern JavaScript (ES6+)
- Follow Electron best practices
- Ensure cross-platform compatibility
- Test file system operations thoroughly
- Maintain responsive UI design

### Mobile App Guidelines
- Follow React Native best practices
- Use functional components with hooks
- Implement proper error handling
- Ensure cross-platform mobile compatibility
- Test on both iOS and Android when possible

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment Information**
   - Operating system and version
   - App version (desktop/mobile)
   - Node.js version (for development issues)

2. **Steps to Reproduce**
   - Clear, numbered steps
   - Expected behavior
   - Actual behavior

3. **Additional Context**
   - Screenshots or videos if applicable
   - Console logs or error messages
   - Any workarounds you've found

### Bug Report Template
```
**Environment:**
- OS: [Windows 10/11, iOS 16+, Android 10+]
- App Version: [Desktop v1.0.0 / Mobile v2.0.0]
- Device: [Desktop PC / iPhone 12 / Samsung Galaxy S21]

**Bug Description:**
A clear description of what the bug is.

**Steps to Reproduce:**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior:**
What you expected to happen.

**Actual Behavior:**
What actually happened.

**Screenshots:**
If applicable, add screenshots to help explain your problem.
```

## 🚀 Feature Requests

We welcome feature requests! Please:

1. **Check Existing Issues**: Look for similar requests first
2. **Provide Context**: Explain the use case and problem
3. **Suggest Solutions**: Share ideas for implementation
4. **Consider Scope**: Think about desktop vs mobile applicability

### Feature Request Template
```
**Feature Description:**
A clear description of the feature you'd like to see.

**Problem Statement:**
What problem does this feature solve?

**Proposed Solution:**
How do you envision this working?

**Platform:**
- [ ] Desktop (Windows)
- [ ] Mobile (iOS)
- [ ] Mobile (Android)
- [ ] All platforms

**Use Case:**
Describe how you would use this feature.
```

## 🔄 Pull Request Process

### Before Submitting
1. **Fork the Repository**: Create your own fork
2. **Create a Branch**: Use descriptive branch names
   ```bash
   git checkout -b feature/add-template-system
   git checkout -b bugfix/folder-path-issue
   git checkout -b docs/update-readme
   ```
3. **Test Your Changes**: Ensure everything works
4. **Update Documentation**: Modify README.md if needed

### Pull Request Guidelines
1. **Clear Title**: Describe what the PR does
2. **Detailed Description**: Explain the changes and reasoning
3. **Link Issues**: Reference related issues or feature requests
4. **Test Instructions**: How to test the changes
5. **Screenshots**: For UI changes, include before/after images

### Pull Request Template
```
**Type of Change:**
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

**Description:**
Brief description of the changes made.

**Related Issues:**
Fixes #[issue number]

**Testing:**
- [ ] Desktop app tested on Windows
- [ ] Mobile app tested on iOS
- [ ] Mobile app tested on Android
- [ ] No breaking changes to existing features

**Screenshots:**
(If applicable)

**Checklist:**
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings or errors
```

## 📋 Code Review Process

### What We Look For
- **Functionality**: Does it work as intended?
- **Code Quality**: Is it readable and maintainable?
- **Performance**: Are there any performance implications?
- **Security**: Are there any security concerns?
- **Testing**: Is it adequately tested?

### Review Timeline
- Initial review within 3-5 business days
- Follow-up reviews within 1-2 business days
- Merge after approval and CI checks pass

## 🧪 Testing

### Desktop App Testing
```bash
# Run the app in development
npm run dev

# Test packaging
npm run build
npm run dist
```

### Mobile App Testing
```bash
# Navigate to mobile app
cd ios-app

# Run tests
npm test

# Run linting
npm run lint

# Test on simulators
npx react-native run-ios
npx react-native run-android
```

### Testing Checklist
- [ ] All existing features work
- [ ] New features work as expected
- [ ] No console errors or warnings
- [ ] UI is responsive and accessible
- [ ] Cross-platform compatibility maintained

## 📚 Documentation

### What to Document
- New features and their usage
- API changes or additions
- Installation or setup changes
- Breaking changes and migration guides

### Documentation Style
- Use clear, concise language
- Include code examples where helpful
- Add screenshots for UI changes
- Update table of contents if needed

## 🏷️ Version Management

We use [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for backward-compatible functionality
- **PATCH** version for backward-compatible bug fixes

### Version Numbering
- Desktop: `v1.x.x`
- Mobile: `v2.x.x`
- Cross-platform features: Both versions updated

## 🤝 Community Guidelines

### Be Respectful
- Use welcoming and inclusive language
- Respect different viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what's best for the community

### Be Collaborative
- Help others learn and grow
- Share knowledge and resources
- Provide constructive feedback
- Ask questions when you need help

### Be Patient
- Remember that everyone has different experience levels
- Take time to explain concepts clearly
- Be understanding of mistakes and learning processes

## 🎯 Areas for Contribution

### High Priority
- [ ] iOS app native file system integration
- [ ] Android app file picker improvements
- [ ] Desktop app template system enhancements
- [ ] Cross-platform settings sync

### Medium Priority
- [ ] Additional professional templates
- [ ] Export/import functionality
- [ ] Theme customization options
- [ ] Keyboard shortcuts

### Documentation
- [ ] Video tutorials
- [ ] API documentation
- [ ] Deployment guides
- [ ] Troubleshooting guides

### Testing
- [ ] Automated testing setup
- [ ] Cross-platform testing
- [ ] Performance testing
- [ ] Accessibility testing

## 📞 Getting Help

### Questions
- Open a GitHub issue with the "question" label
- Check existing issues and documentation first
- Provide context and what you've already tried

### Technical Support
- Include detailed environment information
- Share relevant code snippets or error messages
- Describe expected vs actual behavior

### Feature Discussions
- Use GitHub Discussions for broader conversations
- Engage with the community for feedback
- Consider creating an RFC for major changes

## 🏆 Recognition

Contributors will be:
- Added to the Contributors section in README.md
- Mentioned in release notes for significant contributions
- Credited in the application's about section

Thank you for contributing to Quick Folder Launcher! Your efforts help make this tool better for creative professionals worldwide. 🚀
