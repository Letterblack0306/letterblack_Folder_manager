/**
 * Project Manager Component
 * Mobile-optimized project and folder management interface
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import { launchImageLibrary, DocumentDirectoryPath, writeFile, readFile } from 'react-native-fs';
import { Platform } from 'react-native';

const { width } = Dimensions.get('window');

const ProjectManager = ({ selectedTemplate, onBack }) => {
  const [projects, setProjects] = useState([]);
  const [folders, setFolders] = useState([]);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [folderName, setFolderName] = useState('');
  const [folderPath, setFolderPath] = useState('');

  // Load saved data on component mount
  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const projectsPath = `${DocumentDirectoryPath}/projects.json`;
      const foldersPath = `${DocumentDirectoryPath}/folders.json`;
      
      try {
        const projectsData = await readFile(projectsPath, 'utf8');
        const foldersData = await readFile(foldersPath, 'utf8');
        
        setProjects(JSON.parse(projectsData) || []);
        setFolders(JSON.parse(foldersData) || []);
      } catch (e) {
        // Files don't exist yet, start with empty arrays
        setProjects([]);
        setFolders([]);
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const saveData = async (newProjects, newFolders) => {
    try {
      const projectsPath = `${DocumentDirectoryPath}/projects.json`;
      const foldersPath = `${DocumentDirectoryPath}/folders.json`;
      
      await writeFile(projectsPath, JSON.stringify(newProjects || projects), 'utf8');
      await writeFile(foldersPath, JSON.stringify(newFolders || folders), 'utf8');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const createProject = async () => {
    if (!projectName.trim()) {
      Alert.alert('Error', 'Please enter a project name');
      return;
    }

    try {
      const newProject = {
        id: Date.now().toString(),
        name: projectName.trim(),
        template: selectedTemplate.name,
        templateId: selectedTemplate.id,
        folders: selectedTemplate.folders,
        created: new Date().toISOString(),
        color: selectedTemplate.color,
      };

      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      await saveData(updatedProjects, folders);
      
      setProjectName('');
      setShowCreateProject(false);
      
      Alert.alert('Success', `Project "${newProject.name}" created successfully!`);
    } catch (error) {
      Alert.alert('Error', 'Failed to create project');
      console.error('Create project error:', error);
    }
  };

  const deleteProject = (projectId) => {
    Alert.alert(
      'Delete Project',
      'Are you sure you want to delete this project?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedProjects = projects.filter(p => p.id !== projectId);
            setProjects(updatedProjects);
            await saveData(updatedProjects, folders);
          },
        },
      ]
    );
  };

  const addFolder = async () => {
    if (!folderName.trim() || !folderPath.trim()) {
      Alert.alert('Error', 'Please enter both folder name and path');
      return;
    }

    try {
      const newFolder = {
        id: Date.now().toString(),
        name: folderName.trim(),
        path: folderPath.trim(),
        added: new Date().toISOString(),
      };

      const updatedFolders = [...folders, newFolder];
      setFolders(updatedFolders);
      await saveData(projects, updatedFolders);
      
      setFolderName('');
      setFolderPath('');
      setShowAddFolder(false);
      
      Alert.alert('Success', `Folder "${newFolder.name}" added successfully!`);
    } catch (error) {
      Alert.alert('Error', 'Failed to add folder');
      console.error('Add folder error:', error);
    }
  };

  const selectFolderPath = () => {
    // On mobile, we'll use a simple text input for path
    // In a real app, you'd integrate with file system access
    Alert.prompt(
      'Folder Path',
      'Enter the folder path:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: (text) => setFolderPath(text || ''),
        },
      ],
      'plain-text',
      folderPath
    );
  };

  const deleteFolder = (folderId) => {
    Alert.alert(
      'Delete Folder',
      'Are you sure you want to remove this folder shortcut?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedFolders = folders.filter(f => f.id !== folderId);
            setFolders(updatedFolders);
            await saveData(projects, updatedFolders);
          },
        },
      ]
    );
  };

  const openFolder = (folderPath) => {
    // In a real implementation, this would open the folder
    Alert.alert('Open Folder', `Would open: ${folderPath}`);
  };

  const renderProject = ({ item }) => (
    <View style={[styles.projectCard, { borderLeftColor: item.color }]}>
      <View style={styles.projectHeader}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>{item.name}</Text>
          <Text style={styles.projectTemplate}>{item.template}</Text>
          <Text style={styles.projectDate}>
            Created: {new Date(item.created).toLocaleDateString()}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteProject(item.id)}
        >
          <Text style={styles.deleteButtonText}>×</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.foldersTitle}>Project Folders:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {item.folders.map((folder, index) => (
          <View key={index} style={styles.folderTag}>
            <Text style={styles.folderTagText}>{folder}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderFolder = ({ item }) => (
    <TouchableOpacity
      style={styles.folderItem}
      onPress={() => openFolder(item.path)}
      onLongPress={() => deleteFolder(item.id)}
    >
      <View style={styles.folderInfo}>
        <Text style={styles.folderItemName}>{item.name}</Text>
        <Text style={styles.folderItemPath} numberOfLines={1}>
          {item.path}
        </Text>
      </View>
      <Text style={styles.folderIcon}>📁</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Project Manager</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Template Info */}
        <View style={[styles.templateInfo, { borderColor: selectedTemplate.color }]}>
          <Text style={styles.templateIcon}>{selectedTemplate.icon}</Text>
          <View style={styles.templateDetails}>
            <Text style={styles.templateName}>{selectedTemplate.name}</Text>
            <Text style={styles.templateDescription}>{selectedTemplate.description}</Text>
          </View>
        </View>

        {/* Projects Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Projects</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowCreateProject(true)}
            >
              <Text style={styles.addButtonText}>+ New Project</Text>
            </TouchableOpacity>
          </View>
          
          {projects.length === 0 ? (
            <Text style={styles.emptyText}>No projects yet. Create your first project!</Text>
          ) : (
            <FlatList
              data={projects}
              renderItem={renderProject}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </View>

        {/* Folders Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Folders</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddFolder(true)}
            >
              <Text style={styles.addButtonText}>+ Add Folder</Text>
            </TouchableOpacity>
          </View>
          
          {folders.length === 0 ? (
            <Text style={styles.emptyText}>No folders added yet. Add shortcuts to your favorite folders!</Text>
          ) : (
            <FlatList
              data={folders}
              renderItem={renderFolder}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>

      {/* Create Project Modal */}
      <Modal
        visible={showCreateProject}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Project</Text>
            <TextInput
              style={styles.input}
              placeholder="Project Name"
              placeholderTextColor="#888"
              value={projectName}
              onChangeText={setProjectName}
              autoFocus={true}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowCreateProject(false);
                  setProjectName('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.createButton]}
                onPress={createProject}
              >
                <Text style={styles.createButtonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Folder Modal */}
      <Modal
        visible={showAddFolder}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Folder Shortcut</Text>
            <TextInput
              style={styles.input}
              placeholder="Folder Name"
              placeholderTextColor="#888"
              value={folderName}
              onChangeText={setFolderName}
            />
            <View style={styles.pathInputContainer}>
              <TextInput
                style={[styles.input, styles.pathInput]}
                placeholder="Folder Path"
                placeholderTextColor="#888"
                value={folderPath}
                onChangeText={setFolderPath}
              />
              <TouchableOpacity
                style={styles.browseButton}
                onPress={selectFolderPath}
              >
                <Text style={styles.browseButtonText}>Browse</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowAddFolder(false);
                  setFolderName('');
                  setFolderPath('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.createButton]}
                onPress={addFolder}
              >
                <Text style={styles.createButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginRight: 60, // Compensate for back button
  },
  templateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 24,
  },
  templateIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  templateDetails: {
    flex: 1,
  },
  templateName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    color: '#888',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  projectCard: {
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  projectTemplate: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 4,
  },
  projectDate: {
    fontSize: 12,
    color: '#888',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  foldersTitle: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 8,
    fontWeight: '600',
  },
  folderTag: {
    backgroundColor: '#404040',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
  },
  folderTagText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '500',
  },
  folderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  folderInfo: {
    flex: 1,
  },
  folderItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  folderItemPath: {
    fontSize: 12,
    color: '#888',
  },
  folderIcon: {
    fontSize: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 24,
    width: width - 40,
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#404040',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 16,
  },
  pathInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pathInput: {
    flex: 1,
    marginRight: 8,
    marginBottom: 0,
  },
  browseButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#666',
    marginRight: 8,
  },
  createButton: {
    backgroundColor: '#4CAF50',
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProjectManager;
