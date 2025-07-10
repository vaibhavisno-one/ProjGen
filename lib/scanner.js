import fs from 'fs';
import path from 'path';

function walkDir(dir, depth = 0) {
  const lines = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    const indent = '  '.repeat(depth);

    if (stat.isDirectory()) {
      lines.push(`${indent}folder ${item}`);
      lines.push(...walkDir(fullPath, depth + 1));
    } else {
      lines.push(`${indent}file ${item}`);
    }
  }

  return lines;
}

export function initStructure(baseDir = '.') {
  const structure = walkDir(baseDir);
  fs.writeFileSync('structure.txt', structure.join('\n'));
  console.log('\n📄 structure.txt created from current folder.');
}