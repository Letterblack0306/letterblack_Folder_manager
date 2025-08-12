# Professional Templates Guide

The Quick Folder Launcher now includes professional templates tailored for different creative industries. Each template provides a pre-configured folder structure and sample files optimized for specific workflows.

## Available Templates

### 🎬 **VFX Artist Template**
- **Best for:** Visual effects artists, compositors
- **Includes:** After Effects comps, Nuke scripts, plates, CGI elements, references
- **Structure:**
  - `01. AE_Comps` - After Effects compositions
  - `02. Nuke_Scripts` - Nuke compositing scripts
  - `03. Renders` - Final rendered outputs
  - `04. Plates_Raw` - Raw footage and plates
  - `05. Elements_CGI` - CG elements and assets
  - `06. References` - Reference materials

### 🎭 **3D Artist Template**
- **Best for:** 3D modelers, animators, technical artists
- **Includes:** Maya scenes, Blender files, textures, models
- **Structure:**
  - `01. Maya_Scenes` - Maya project files
  - `02. Blender_Files` - Blender project files
  - `03. Textures` - Texture maps and materials
  - `04. Renders` - Rendered images and animations
  - `05. Models_Export` - Exported 3D models
  - `06. References` - Reference images and concepts

### 💻 **Developer Template**
- **Best for:** Software developers, programmers
- **Includes:** Source code structure, documentation, tests
- **Structure:**
  - `src/` - Source code files
  - `docs/` - Project documentation
  - `tests/` - Test files and test data
  - `assets/` - Static assets and resources
  - `build/` - Build output directory
  - `package.json` - Project configuration
  - `README.md` - Project documentation

### 🎨 **Graphic Designer Template**
- **Best for:** Graphic designers, brand designers
- **Includes:** Adobe Creative Suite workflow
- **Structure:**
  - `01. Photoshop_Files` - Photoshop documents
  - `02. Illustrator_Files` - Vector artwork
  - `03. InDesign_Files` - Layout documents
  - `04. Final_Exports` - Exported final files
  - `05. Assets_Fonts` - Fonts and design assets
  - `06. References` - Design references and mood boards

### 🎞️ **Video Editor Template**
- **Best for:** Video editors, motion graphics artists
- **Includes:** Multi-platform editing workflow
- **Structure:**
  - `01. Premiere_Projects` - Premiere Pro projects
  - `02. DaVinci_Projects` - DaVinci Resolve projects
  - `03. Raw_Footage` - Original video files
  - `04. Audio` - Audio files and music
  - `05. Final_Exports` - Rendered videos
  - `06. Graphics_Motion` - Motion graphics and titles

### 📸 **Photographer Template**
- **Best for:** Photographers, photo editors
- **Includes:** Photography workflow with Lightroom
- **Structure:**
  - `01. RAW_Files` - Original RAW photos
  - `02. Lightroom_Catalog` - Lightroom catalog and presets
  - `03. Edited_Photos` - Processed images
  - `04. Final_Delivery` - Client delivery files
  - `05. Contact_Sheets` - Contact sheets and proofs

### 🏷️ **Default Template**
- **Best for:** General purpose projects
- **Includes:** Basic AEP and Premiere Pro structure
- **Structure:**
  - `01. AEP` - After Effects projects
  - `02. prePro` - Premiere Pro projects
  - `03. Renders` - Rendered outputs
  - `04. Planning` - Project planning
  - `05. Assets` - Source materials
  - `06. Audio` - Audio files
  - `07. Graphics` - Graphics and images
  - `08. Archive` - Archived versions

## How to Use Templates

### Creating a New Project
1. Click "Create Folder Structure"
2. Enter your project name
3. Select the template that matches your workflow
4. Choose the save location
5. Click "Create Project"

### Changing Your Default Template
1. Click the Settings button (⚙️)
2. In the "Active Template" section, select your preferred template
3. View the template description in the preview area
4. Click "Save Settings"

### Using Custom Templates
1. In Settings, check "Use Custom Template Folder"
2. Browse and select your custom template folder
3. Set the placeholder name (usually "Temp")
4. Save settings

## Template Placeholders

All templates use placeholder replacement:
- **[DATE]** - Replaced with current date
- **Temp** (or your custom placeholder) - Replaced with your project name

## File Naming Convention

Template files follow this pattern:
- `ProjectName_main.aep` - Main After Effects file
- `ProjectName_edit.prproj` - Main Premiere Pro file
- `ProjectName_comp.nk` - Main Nuke composite
- `ProjectName_project.blend` - Main Blender file

## Tips for Best Results

1. **Choose the right template** - Select based on your primary workflow
2. **Consistent naming** - Use descriptive, consistent project names
3. **Organize early** - Set up your project structure before starting work
4. **Customize as needed** - Templates are starting points, modify as required
5. **Backup important work** - Keep backups of your project files

## Creating Custom Templates

To create your own template:
1. Create a folder with your desired structure
2. Use "Temp" as placeholder in file/folder names
3. Add placeholder content in files using "Temp" and "[DATE]"
4. In Settings, enable "Use Custom Template Folder"
5. Browse to select your template folder

The system will automatically replace "Temp" with your project name and "[DATE]" with the current date when creating new projects.
