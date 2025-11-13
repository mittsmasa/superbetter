import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

function getAllFiles(dir: string, files: string[] = []): string[] {
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    if (statSync(fullPath).isDirectory()) {
      if (!item.startsWith('.') && item !== 'node_modules') {
        getAllFiles(fullPath, files);
      }
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  return files;
}

function updateFile(filePath: string): boolean {
  const content = readFileSync(filePath, 'utf-8');
  let modified = false;

  // Pattern 1: <Icon className={css({ width: '[XXpx]', height: '[YYpx]' })} />
  // -> <Icon size={XX} />
  const pattern1 =
    /<([A-Z][a-zA-Z0-9]*)\s+className=\{css\(\{\s*width:\s*'\[(\d+)px\]',?\s*height:\s*'\[\d+px\]'\s*\}\)\}\s*\/>/g;
  const newContent1 = content.replace(pattern1, (match, iconName, size) => {
    modified = true;
    return `<${iconName} size={${size}} />`;
  });

  // Pattern 2: <Icon className={css({ width: '[XXpx]' })} />
  // -> <Icon size={XX} />
  const pattern2 =
    /<([A-Z][a-zA-Z0-9]*)\s+className=\{css\(\{\s*width:\s*'\[(\d+)px\]'\s*\}\)\}\s*\/>/g;
  const newContent2 = newContent1.replace(pattern2, (match, iconName, size) => {
    modified = true;
    return `<${iconName} size={${size}} />`;
  });

  // Pattern 3: Multi-line patterns
  // <Icon
  //   className={css({ width: '[XXpx]', height: '[YYpx]' })}
  // />
  const pattern3 =
    /<([A-Z][a-zA-Z0-9]*)\s+className=\{css\(\{\s*width:\s*'\[(\d+)px\]',?\s*height:\s*'\[\d+px\]'\s*\}\)\}\s*>/g;
  const newContent3 = newContent2.replace(pattern3, (match, iconName, size) => {
    modified = true;
    return `<${iconName} size={${size}}>`;
  });

  // Pattern 4: Multi-line with only width
  const pattern4 =
    /<([A-Z][a-zA-Z0-9]*)\s+className=\{css\(\{\s*width:\s*'\[(\d+)px\]'\s*\}\)\}\s*>/g;
  const newContent4 = newContent3.replace(pattern4, (match, iconName, size) => {
    modified = true;
    return `<${iconName} size={${size}}>`;
  });

  if (modified) {
    writeFileSync(filePath, newContent4, 'utf-8');
  }

  return modified;
}

const srcDir = resolve(process.cwd(), 'src');
const files = getAllFiles(srcDir);
let updatedCount = 0;

for (const file of files) {
  const updated = updateFile(file);
  if (updated) {
    console.log(`Updated: ${file.replace(process.cwd(), '.')}`);
    updatedCount++;
  }
}

console.log(`\n✓ Updated ${updatedCount} files`);
