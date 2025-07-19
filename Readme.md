# 📦 projgen-cli

[![npm version](https://img.shields.io/npm/v/projgen-cli?color=blue)](https://www.npmjs.com/package/projgen-cli)
[![npm downloads](https://img.shields.io/npm/dt/projgen-cli)](https://www.npmjs.com/package/projgen-cli)
[![GitHub stars](https://img.shields.io/github/stars/vaibhavisno-one/Projgen?style=social)](https://github.com/vaibhavisno-one/ProjGen/stargazers)
[![MIT License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

> Generate, sync, and maintain your project's file/folder structure from a single `structure.txt` file — simple, fast, and programmable.

---

## 🚀 Why use projgen-cli?

Setting up project folders manually can be a pain. With `projgen-cli`, you can:

- 🔧 Define your folder/file structure in a readable file
- 🏗️ Auto-create your entire project tree
- 🔁 Keep your file system in sync with your `structure.txt`
- 🧹 Remove files/folders no longer in the structure
- 📁 Automatically update the structure file after syncing

---

## 📥 Installation

### Option 1: Use via `npx` (No install needed)

```bash
npx projgen-cli init
npx projgen-cli sync
```

### Option 2: Install globally

```bash
npm install -g projgen-cli
```

Then use anywhere:

```bash
projgen-cli init
projgen-cli sync
```

---

## 📂 Commands

### `projgen-cli init`

Creates a `structure.txt` file based on your current folder structure.

```bash
projgen-cli init
```

Example output:

```txt
folder bin
  file index.js
folder lib
  file parser.js
  file scanner.js
  file sync.js
file package.json
file structure.txt
```

---

### `projgen-cli sync`

Syncs your real filesystem with `structure.txt`:

```bash
projgen-cli sync
```

- 📁 Creates missing folders/files
- 🗑️ Removes files/folders not listed (except `.git`, `node_modules`, and `structure.txt`)
- 📄 Automatically updates `structure.txt` to reflect actual structure

---

## ✏️ structure.txt Format

```txt
folder src
  folder components
    file Navbar.js
  file index.js
folder public
  file index.html
file package.json
file README.md
```

- 🔹 Use 2-space indentation for nesting
- 🔸 Use `folder` or `file` followed by the name

---

## 🧪 Example Workflow

```bash
projgen-cli init              # Generates structure.txt from current project
# Edit structure.txt (add new folders/files)
projgen-cli sync              # Creates new ones, removes missing ones, updates structure.txt
```

---

## 🛡️ Safety Notes

- `projgen-cli` skips:
  - `node_modules`
  - `.git`
  - `structure.txt`

❗ **Be cautious:** syncing will delete anything not listed in `structure.txt`.

Best used in version-controlled projects (e.g. Git)

---

## 🛠 Development

Clone and run locally:

```bash
git clone https://github.com/vaibhavisno-one/ProjGen
cd projgen-cli
npm install
npm link  # optional: use it globally like a real CLI
```

Run commands locally:

```bash
projgen-cli init
projgen-cli sync
```

Project structure:

```
bin/
  index.js         # CLI entry point
lib/
  parser.js        # structure.txt parser
  scanner.js       # init logic
  sync.js          # syncing logic
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork this repo
2. Clone your fork
3. Create a new branch (`git checkout -b feature-name`)
4. Make your changes
5. Commit and push
6. Open a Pull Request

**Guidelines:**

- Keep code modular and readable
- Use ESModules (`type: "module"` in `package.json`)
- Test your changes thoroughly before PR
- Respect the existing code style

---


## 🌐 Useful Links

- [📦 projgen-cli on npm](https://www.npmjs.com/package/projgen-cli)