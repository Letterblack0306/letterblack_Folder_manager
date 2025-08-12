/**
 * Quick Folder Launcher Mobile - Main App Component
 * React Native version of the desktop Quick Folder Launcher
 * 
 * Features:
 * - Professional project templates
 * - Touch-optimized interface
 * - Cloud storage integration ready
 * - Cross-platform (iOS & Android)
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

import TemplateSelector from './src/components/TemplateSelector';
import ProjectManager from './src/components/ProjectManager';

const App = () => {
  const [currentScreen, setCurrentScreen] = React.useState('templates');
  const [selectedTemplate, setSelectedTemplate] = React.useState(null);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    Alert.alert(
      'Template Selected',
      `You selected: ${template.name}\n\nThis will create a ${template.profession} project structure.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Continue', 
          onPress: () => setCurrentScreen('project') 
        }
      ]
    );
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'templates':
        return <TemplateSelector onTemplateSelect={handleTemplateSelect} />;
      case 'project':
        return <ProjectManager template={selectedTemplate} onBack={() => setCurrentScreen('templates')} />;
      default:
        return <TemplateSelector onTemplateSelect={handleTemplateSelect} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e1e1e" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quick Folder Launcher</Text>
        <Text style={styles.headerSubtitle}>Professional Project Templates</Text>
      </View>

      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity 
          style={[styles.navButton, currentScreen === 'templates' && styles.navButtonActive]}
          onPress={() => setCurrentScreen('templates')}
        >
          <Text style={[styles.navButtonText, currentScreen === 'templates' && styles.navButtonTextActive]}>
            📁 Templates
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, currentScreen === 'project' && styles.navButtonActive]}
          onPress={() => setCurrentScreen('project')}
          disabled={!selectedTemplate}
        >
          <Text style={[
            styles.navButtonText, 
            currentScreen === 'project' && styles.navButtonTextActive,
            !selectedTemplate && styles.navButtonTextDisabled
          ]}>
            🚀 Project
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderScreen()}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with ❤️ for creative professionals</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  header: {
    padding: 20,
    backgroundColor: '#2d2d2d',
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#aaaaaa',
    textAlign: 'center',
    marginTop: 4,
  },
  navigation: {
    flexDirection: 'row',
    backgroundColor: '#2d2d2d',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  navButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#404040',
  },
  navButtonActive: {
    backgroundColor: '#0078d4',
  },
  navButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  navButtonTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  navButtonTextDisabled: {
    color: '#666666',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  footer: {
    padding: 16,
    backgroundColor: '#2d2d2d',
    borderTopWidth: 1,
    borderTopColor: '#404040',
  },
  footerText: {
    color: '#aaaaaa',
    textAlign: 'center',
    fontSize: 12,
  },
});

export default App;
