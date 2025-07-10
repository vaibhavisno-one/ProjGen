import fs from 'fs';
import path from 'path';
import { parseStructure } from './parser.js';

function getExistingPaths(base = '.') {
  const result = [];
  function walk(dir) {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const relPath = path.relative(base, fullPath);
      const stat = fs.statSync(fullPath);
      result.push({ path: relPath, type: stat.isDirectory() ? 'folder' : 'file' });
      if (stat.isDirectory()) walk(fullPath);
    }
  }
  walk(base);
  return result;
}

export function syncStructure(base = '.') {
  if (!fs.existsSync('structure.txt')) {
    console.error('❌ structure.txt not found. Run `projgen init` first.');
    return;
  }

  const content = fs.readFileSync('structure.txt', 'utf-8');
  const desired = parseStructure(content);
  const existing = getExistingPaths(base);

  const desiredSet = new Set(desired.map(d => d.path));
  const existingSet = new Set(existing.map(e => e.path));

  // Add missing paths
  for (const { path: p, type } of desired) {
    if (!existingSet.has(p)) {
      const fullPath = path.join(base, p);
      if (type === 'folder') {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`📁 Created: ${p}`);
      } else {
        fs.mkdirSync(path.dirname(fullPath), { recursive: true });
        fs.writeFileSync(fullPath, '');
        console.log(`📄 Created: ${p}`);
      }
    }
  }

  // Remove extra paths
  for (const { path: p, type } of existing.reverse()) {
    if (!desiredSet.has(p)) {
      const fullPath = path.join(base, p);
      if (type === 'folder') {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`🗑️ Removed folder: ${p}`);
      } else {
        fs.unlinkSync(fullPath);
        console.log(`🗑️ Removed file:   ${p}`);
      }
    }
  }

  console.log('\n✅ Sync complete.');
}