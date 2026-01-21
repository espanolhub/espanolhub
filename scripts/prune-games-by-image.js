const fs = require('fs');
const path = require('path');

const GAMES_PATH = path.join(__dirname, '..', 'lib', 'library', 'data', 'juegos.json');

function hasImageField(obj) {
  if (!obj || typeof obj !== 'object') return false;
  const keys = ['image', 'img', 'cover', 'coverUrl', 'artwork', 'thumbnail', 'imageUrl', 'image_path'];
  return keys.some(k => Object.prototype.hasOwnProperty.call(obj, k));
}

function run() {
  if (!fs.existsSync(GAMES_PATH)) {
    console.error('juegos.json not found:', GAMES_PATH);
    process.exit(1);
  }
  const raw = fs.readFileSync(GAMES_PATH, 'utf8');
  let arr;
  try {
    arr = JSON.parse(raw);
    if (!Array.isArray(arr)) throw new Error('expected array');
  } catch (e) {
    console.error('Failed to parse juegos.json:', e.message);
    process.exit(1);
  }

  const keep = arr.filter(hasImageField);
  const removedCount = arr.length - keep.length;

  const backupPath = GAMES_PATH + '.bak.' + Date.now();
  fs.copyFileSync(GAMES_PATH, backupPath);
  fs.writeFileSync(GAMES_PATH, JSON.stringify(keep, null, 2), 'utf8');

  console.log(`Pruned juegos.json: removed ${removedCount} entries. Backup saved to ${backupPath}`);
}

if (require.main === module) run();

