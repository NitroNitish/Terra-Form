import fs from 'fs';
import path from 'path';

const dir = './src/sections';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('¥')) {
    content = content.replace(/¥/g, '₹');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Replaced in ${file}`);
  }
});
