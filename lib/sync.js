import fs from 'fs';
import path from 'path';
import { parseStructure } from './parser.js';
import { initStructure } from './scanner.js';

function getExistingPaths(base = '.') {
  const result = [];
  function walk(dir) {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      if (entry === 'structure.txt') continue;  // prevent deleting structure.txt itself
      if (entry === '.git' || entry === 'node_modules') continue; // skip common dirs

      const fullPath = path.join(dir, entry);
      const relPath = path.relative(base, fullPath).replace(/\\/g, '/');
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
    console.error(' structure.txt not found. Run `projgen init` first.');
    return;
  }

  const content = fs.readFileSync('structure.txt', 'utf-8');
  const desired = parseStructure(content);
  const existing = getExistingPaths(base);

  const normalize = p => p.replace(/\\/g, '/');
  const desiredSet = new Set(desired.map(d => normalize(d.path)));
  const existingSet = new Set(existing.map(e => normalize(e.path)));

  // Create missing files/folders
  for (const { path: p, type } of desired) {
    const normPath = normalize(p);
    if (!existingSet.has(normPath)) {
      const fullPath = path.join(base, p);
      if (type === 'folder') {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(` Created: ${p}`);
      } else {
        fs.mkdirSync(path.dirname(fullPath), { recursive: true });
        fs.writeFileSync(fullPath, '');
        console.log(` Created: ${p}`);
      }
    }
  }

  // Remove files/folders NOT in structure.txt
  // Traverse in reverse order to delete children before parents
  for (const { path: p, type } of existing.reverse()) {
    const normPath = normalize(p);
    if (!desiredSet.has(normPath)) {
      const fullPath = path.join(base, p);
      try {
        if (type === 'folder') {
          fs.rmSync(fullPath, { recursive: true, force: true });
          console.log(` Removed folder: ${p}`);
        } else {
          fs.unlinkSync(fullPath);
          console.log(`Removed file:   ${p}`);
        }
      } catch (err) {
        console.error(` Failed to remove ${p}: ${err.message}`);
      }
    }
  }

  console.log('\nSync complete.');

  // regenerate structure.txt from current folder state
  initStructure(base);
  console.log(' structure.txt updated to reflect current folder structure.');
}
