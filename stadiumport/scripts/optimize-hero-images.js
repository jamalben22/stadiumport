const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  try {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filepath = path.join(dir, file);
      if (fs.statSync(filepath).isDirectory()) {
        filelist = walkSync(filepath, filelist);
      } else {
        if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
          filelist.push(filepath);
        }
      }
    });
  } catch (e) {
    console.error(e);
  }
  return filelist;
};

const srcDir = path.join(__dirname, '../src/app');
const files = walkSync(srcDir);
let count = 0;

files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  let updated = false;

  // Search for Image components with priority prop
  // We want to add quality={60} if it's missing
  
  // This regex matches <Image [anything] priority [anything] >
  // It captures the parts before and after priority
  // We use a non-greedy match for the content inside Image tag
  
  const regex = /(<Image\s+[^>]*?)\bpriority\b([^>]*?)(>|\/>)/g;
  
  if (regex.test(content)) {
    const newContent = content.replace(regex, (match, before, after, end) => {
      // Check if quality is already present in the match
      if (match.includes('quality=')) {
        return match;
      }
      
      // Add quality={60} after priority
      return `${before}priority quality={60}${after}${end}`;
    });

    if (newContent !== content) {
      content = newContent;
      updated = true;
      count++;
      console.log(`Optimized hero image in: ${path.relative(srcDir, file)}`);
    }
  }

  if (updated) {
    fs.writeFileSync(file, content, 'utf8');
  }
});

console.log(`Total files updated: ${count}`);
