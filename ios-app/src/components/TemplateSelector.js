/**
 * Template Selector Component
 * Mobile-optimized template selection interface
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const templates = [
  {
    id: 'vfx-artist',
    name: 'VFX Artist',
    icon: '🎬',
    profession: 'VFX',
    description: 'VFX workflow with After Effects, Nuke, plates, and elements',
    color: '#ff6b6b',
    folders: ['AE_Comps', 'Nuke_Scripts', 'Renders', 'Plates_Raw', 'Elements_CGI', 'References']
  },
  {
    id: '3d-artist',
    name: '3D Artist',
    icon: '🎭',
    profession: '3D',
    description: '3D pipeline with Maya, Blender, textures, and renders',
    color: '#4ecdc4',
    folders: ['Maya_Scenes', 'Blender_Files', 'Textures', 'Renders', 'Models_Export', 'References']
  },
  {
    id: 'developer',
    name: 'Developer',
    icon: '💻',
    profession: 'Development',
    description: 'Software development with src, docs, tests, and build folders',
    color: '#45b7d1',
    folders: ['src', 'docs', 'tests', 'assets', 'build', 'README.md']
  },
  {
    id: 'graphic-designer',
    name: 'Graphic Designer',
    icon: '🎨',
    profession: 'Design',
    description: 'Design workflow with Photoshop, Illustrator, and InDesign',
    color: '#f9ca24',
    folders: ['Photoshop_Files', 'Illustrator_Files', 'InDesign_Files', 'Final_Exports', 'Assets_Fonts', 'References']
  },
  {
    id: 'video-editor',
    name: 'Video Editor',
    icon: '🎞️',
    profession: 'Video',
    description: 'Video editing with Premiere, DaVinci, footage, and exports',
    color: '#a55eea',
    folders: ['Premiere_Projects', 'DaVinci_Projects', 'Raw_Footage', 'Audio', 'Final_Exports', 'Graphics_Motion']
  },
  {
    id: 'photographer',
    name: 'Photographer',
    icon: '📸',
    profession: 'Photography',
    description: 'Photography workflow with RAW files, Lightroom, and delivery',
    color: '#26de81',
    folders: ['RAW_Files', 'Lightroom_Catalog', 'Edited_Photos', 'Final_Delivery', 'Contact_Sheets']
  },
  {
    id: 'default',
    name: 'Default Template',
    icon: '📁',
    profession: 'General',
    description: 'Basic project structure with AEP and Premiere Pro folders',
    color: '#778ca3',
    folders: ['AEP', 'prePro', 'Renders', 'Planning', 'Assets', 'Audio', 'Graphics', 'Archive']
  }
];

const TemplateSelector = ({ onTemplateSelect }) => {
  const renderTemplate = (template) => (
    <TouchableOpacity
      key={template.id}
      style={[styles.templateCard, { borderLeftColor: template.color }]}
      onPress={() => onTemplateSelect(template)}
      activeOpacity={0.7}
    >
      <View style={styles.templateHeader}>
        <Text style={styles.templateIcon}>{template.icon}</Text>
        <View style={styles.templateInfo}>
          <Text style={styles.templateName}>{template.name}</Text>
          <Text style={[styles.templateProfession, { backgroundColor: template.color }]}>
            {template.profession}
          </Text>
        </View>
      </View>
      
      <Text style={styles.templateDescription}>{template.description}</Text>
      
      <View style={styles.folderPreview}>
        <Text style={styles.folderPreviewTitle}>Includes:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {template.folders.slice(0, 4).map((folder, index) => (
            <View key={index} style={styles.folderTag}>
              <Text style={styles.folderTagText}>{folder}</Text>
            </View>
          ))}
          {template.folders.length > 4 && (
            <View style={styles.folderTag}>
              <Text style={styles.folderTagText}>+{template.folders.length - 4} more</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Workflow Template</Text>
      <Text style={styles.subtitle}>
        Select the template that best matches your professional workflow
      </Text>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {templates.map(renderTemplate)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#aaaaaa',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 20,
  },
  templateCard: {
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderColor: '#404040',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  templateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  templateIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  templateProfession: {
    fontSize: 12,
    color: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    fontWeight: '600',
  },
  templateDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
    marginBottom: 12,
  },
  folderPreview: {
    marginTop: 8,
  },
  folderPreviewTitle: {
    fontSize: 12,
    color: '#aaaaaa',
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
});

export default TemplateSelector;
