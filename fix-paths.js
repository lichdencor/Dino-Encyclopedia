import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function walkDir(dir, callback) {
  readdirSync(dir).forEach(f => {
    let dirPath = join(dir, f);
    let isDirectory = statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(join(dir, f));
  });
}

function fixPathsInFile(filePath) {
  const extensions = ['.css', '.tsx', '.ts', '.js', '.jsx'];
  if (!extensions.some(ext => filePath.endsWith(ext))) return;

  let content = readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Fix paths in url() statements and string literals
  content = content.replace(/url\(["']?\/public\/assets\//g, 'url(/assets/');
  content = content.replace(/["']\/public\/assets\//g, '"/assets/');

  if (content !== originalContent) {
    writeFileSync(filePath, content, 'utf8');
    console.log(`Updated paths in: ${filePath}`);
  }
}

// Start from the src directory
walkDir('./src', fixPathsInFile);

// Also fix JSON files
const jsonFiles = [
  'src/context/data/books_data.json',
  'src/context/data/galleries_data.json',
  'src/context/data/album_data.json',
  'src/context/data/books_data_spanish.json',
  'src/context/data/galleries_data_spanish.json'
];

jsonFiles.forEach(filePath => {
  try {
    let content = readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Replace all instances of /public/assets/ with /assets/
    content = content.replace(/\/public\/assets\//g, '/assets/');

    if (content !== originalContent) {
      writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed JSON paths in: ${filePath}`);
    }
  } catch (error) {
    console.log(`File not found or error reading: ${filePath}`);
  }
});

console.log('Path fixing complete!'); 