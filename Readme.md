# Projgen

**Projgen** is a CLI tool to generate, sync, and manage your project folder and file structure from a simple text file (`structure.txt`).  
It helps automate creating and removing files/folders based on your defined structure, speeding up project setup and maintenance.

---

## Features

- Initialize your current project folder structure into a human-readable `structure.txt`
- Sync the filesystem with changes in `structure.txt`:
  - Create missing files and folders
  - Remove files and folders removed from `structure.txt`
- Automatically update `structure.txt` after syncing to reflect the real folder state
- Skip important/system folders like `.git` and `node_modules`
- Simple, readable folder/file definition syntax

---

## Installation

1. Clone this repo or download the source:

   ```bash
   git clone https://github.com/yourusername/projgen.git
   cd projgen
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. (Optional) Link globally to use CLI anywhere:

   ```bash
   npm link
   ```

---

## Usage

### Initialize structure file

Generates a `structure.txt` file reflecting your current project structure:

```bash
projgen init
```

### Sync your filesystem

Updates your filesystem to match the `structure.txt`:

```bash
projgen sync
```

- Creates missing folders/files listed in `structure.txt`
- Deletes files/folders no longer in `structure.txt`
- Automatically updates `structure.txt` after syncing

---

## `structure.txt` format

Define folders and files using indentation:

```text
folder bin
  file index.js
folder lib
  file parser.js
  file scanner.js
  file sync.js
file package.json
file README.md
file structure.txt
```

- Use `folder <foldername>` to define folders
- Use `file <filename>` to define files
- Indent child files/folders with two spaces

---

### Notes

- The tool skips syncing `.git`, `node_modules`, and `structure.txt` itself
- Always run `projgen init` first to create `structure.txt` before syncing
- **Use this tool carefully — syncing will remove files/folders not present in `structure.txt`**

---

## Development

- Source code lives under `bin/` and `lib/` folders
- CLI entry point is `bin/index.js`
- Main syncing logic is in `lib/sync.js`
- Structure parsing is in `lib/parser.js`
- Folder scanning logic is in `lib/scanner.js`
