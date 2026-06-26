import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    let content = fs.readFileSync(file, 'utf8');

    // Remove `lang === 'zh' ? A : B` constructs
    // 1. Inside JSX: {lang === 'zh' ? A : B} -> {B}
    content = content.replace(/\{lang\s*===\s*['"]zh['"]\s*\?\s*[^:]+\s*:\s*([^}]+)\}/g, '{$1}');
    
    // 2. Inside attributes or template literals: ${lang === 'zh' ? A : B}
    content = content.replace(/\$\{lang\s*===\s*['"]zh['"]\s*\?\s*[^:]+\s*:\s*([^}]+)\}/g, '${$1}');

    // 3. Bare ternary, e.g. alt={lang === 'zh' ? A : B} -> alt={B} 
    // This might already be covered by rule 1, if it has brackets.

    // 4. Other occurrences: lang === 'zh' ? a.nameCn.localeCompare(b.nameCn) : a.nameEn.localeCompare(b.nameEn)
    // We will just do a generic replace up to the end of the line if there's no bracket
    content = content.replace(/lang\s*===\s*['"]zh['"]\s*\?\s*[^:]+\s*:\s*(.*)/g, (match, p1) => {
       // if it has a closing bracket or parenthesis from the surrounding context, it's trickier
       // let's try a safer replace for specific known patterns:
       return p1; 
    });

    // Replace t(zh, en) with just en
    const tRegex = /t\(\s*(['"`])(?:(?!\1)[\s\S]|\\\1)*\1\s*,\s*(['"`])((?:(?!\2)[\s\S]|\\\2)*)\2\s*\)/g;
    content = content.replace(tRegex, '$2$3$2');

    // Remove useLanguage import and usages
    content = content.replace(/import\s*\{\s*useLanguage(?:,\s*LanguageProvider)?\s*\}\s*from\s*'@\/context\/LanguageContext';?\n?/g, '');
    content = content.replace(/import\s*\{\s*LanguageProvider\s*\}\s*from\s*'@\/context\/LanguageContext';?\n?/g, '');
    
    // Remove useLanguage hook call
    content = content.replace(/\s*const\s*\{[^}]*\}\s*=\s*useLanguage\(\);?\n?/g, '\n');

    // Replace Kilnfolk and 窑火生活 with Terraform
    content = content.replace(/Kilnfolk/g, 'Terraform');
    content = content.replace(/窑火生活/g, 'Terraform');

    fs.writeFileSync(file, content, 'utf8');
  }
});

// Clean up index.html
let indexHtml = fs.readFileSync('./index.html', 'utf8');
indexHtml = indexHtml.replace(/窑火生活 Kilnfolk/gi, 'Terraform');
indexHtml = indexHtml.replace(/Kilnfolk/gi, 'Terraform');
indexHtml = indexHtml.replace(/lang="zh"/gi, 'lang="en-IN"');
fs.writeFileSync('./index.html', indexHtml, 'utf8');

// Update App.tsx specifically to remove LanguageProvider wrapper
let appContent = fs.readFileSync('./src/App.tsx', 'utf8');
appContent = appContent.replace(/<LanguageProvider>\s*/g, '');
appContent = appContent.replace(/\s*<\/LanguageProvider>/g, '');
fs.writeFileSync('./src/App.tsx', appContent, 'utf8');

// Delete LanguageContext if we can
try {
  fs.unlinkSync('./src/context/LanguageContext.tsx');
} catch (e) {
  // ignore
}

// Remove traces in package.json and README.md
let pkg = fs.readFileSync('./package.json', 'utf8');
pkg = pkg.replace(/"name":\s*".*?"/, '"name": "terraform-website"');
fs.writeFileSync('./package.json', pkg, 'utf8');

let readme = `# Terraform\n\nA beautiful React website.\n`;
fs.writeFileSync('./README.md', readme, 'utf8');

try {
  fs.unlinkSync('./info.md');
} catch(e) {}

console.log('Cleanup script finished.');
