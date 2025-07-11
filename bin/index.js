#!/usr/bin/env node
import fs from 'fs';
import { initStructure } from '../lib/scanner.js';
import { syncStructure } from '../lib/sync.js';

const args = process.argv.slice(2);

switch (args[0]) {
  case 'init':
    initStructure();
    break;
  case 'sync':
    syncStructure();
    break;
  default:
    console.log(`\nUsage:`);
    console.log(`  projgen init       # generate structure.txt from current folder`);
    console.log(`  projgen sync       # sync structure.txt with filesystem`);
    break;
}
