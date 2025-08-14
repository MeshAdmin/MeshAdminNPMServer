const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

async function prepareBackend() {
  console.log('Preparing backend for Electron packaging...');
  
  const backendDir = path.join(__dirname, '../backend');
  const tempBackendDir = path.join(__dirname, 'temp-backend');
  
  try {
    // Clean up any existing temp directory
    await fs.remove(tempBackendDir);
    
    // Create temp directory structure
    await fs.ensureDir(tempBackendDir);
    
    // Copy backend dist files
    console.log('Copying backend dist files...');
    await fs.copy(
      path.join(backendDir, 'dist'),
      path.join(tempBackendDir, 'dist')
    );
    
    // Copy prisma files
    console.log('Copying Prisma files...');
    await fs.copy(
      path.join(backendDir, 'prisma'),
      path.join(tempBackendDir, 'prisma')
    );
    
    // Copy package.json
    console.log('Copying package.json...');
    await fs.copy(
      path.join(backendDir, 'package.json'),
      path.join(tempBackendDir, 'package.json')
    );
    
    // Install production dependencies using npm (to avoid symlinks)
    console.log('Installing backend production dependencies (this may take a moment)...');
    execSync('npm install --production --no-package-lock', {
      cwd: tempBackendDir,
      stdio: 'inherit'
    });
    
    console.log('Backend prepared successfully!');
  } catch (error) {
    console.error('Error preparing backend:', error);
    process.exit(1);
  }
}

prepareBackend();
