const fs = require('fs');
const path = require('path');

const OUT = path.resolve(process.cwd(), 'lib', 'library', 'data', 'juegos.json');

function randChoice(arr) { return arr[Math.floor(Math.random()*arr.length)]; }

const wordRaceConfigs = (i) => ({
  gameType: 'word-race',
  config: {
    difficulty: i % 3 === 0 ? 'easy' : i % 3 === 1 ? 'medium' : 'advanced',
    rounds: 5 + (i % 10),
    timePerQuestion: [3,4,5,6][i % 4],
  }
});

const examConfigs = (i) => ({
  gameType: 'exam-simulator',
  config: {
    questions: 10 + (i % 5)*5,
    seed: Date.now() + i,
  }
});

function makeEntry(id, title, type, config, level) {
  return {
    id,
    title,
    level,
    summary: `${title} - ${type}`,
    excerpt: `Juego ${type} - nivel ${level}`,
    content: JSON.stringify({ gameType: config.gameType, config: config.config }),
    examples: [],
  };
}

function main() {
  let arr = [];
  try {
    const raw = fs.readFileSync(OUT, 'utf8');
    arr = JSON.parse(raw || '[]');
  } catch (e) {
    arr = arr;
  }

  const start = arr.length + 1;
  const totalToAdd = 300;
  for (let i=0;i<totalToAdd;i++) {
    const idx = start + i;
    if (i % 5 === 0) {
      const cfg = examConfigs(i);
      arr.push(makeEntry(`game-gen-${idx}`, `Simulador Oficial ${idx}`, 'exam-simulator', cfg, ['beginner','intermediate','advanced'][i%3]));
    } else {
      const cfg = wordRaceConfigs(i);
      arr.push(makeEntry(`game-gen-${idx}`, `Reto Verbo ${idx}`, 'word-race', cfg, ['beginner','intermediate','advanced'][i%3]));
    }
  }

  fs.writeFileSync(OUT, JSON.stringify(arr, null, 2), 'utf8');
  console.log('Generated', totalToAdd, 'game entries into', OUT);
}

if (require.main === module) main();

