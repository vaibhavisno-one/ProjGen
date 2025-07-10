export function parseStructure(text) {
  const lines = text.split('\n').filter(Boolean);
  const structure = [];
  const stack = [];

  lines.forEach(line => {
    const match = line.match(/^( *)?(folder|file) (.+)/);
    if (!match) return;

    const [, spaces = '', type, name] = match;
    const depth = spaces.length / 2;
    const cleanName = name.replace(/\/$/, '');
    stack[depth] = cleanName;

    const fullPath = stack.slice(0, depth + 1).join('/');

    structure.push({
      name: cleanName,
      path: fullPath,
      type
    });
  });

  return structure;
}
