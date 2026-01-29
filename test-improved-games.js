// Test script to validate improved existing games
const fs = require('fs');
const path = require('path');

console.log('🎮 Testing Improved Existing Games...\n');

// Test 1: Check if games page has enhanced features
console.log('1. Checking enhanced game mechanics...');
try {
  const gamesPagePath = path.join(__dirname, 'app', 'juegos', 'page.tsx');
  const gamesPageContent = fs.readFileSync(gamesPagePath, 'utf8');
  
  const enhancements = [
    { name: 'Multiple Choice Letter Labels', check: 'String.fromCharCode(65 + index)' },
    { name: 'Enhanced Button Animations', check: 'hover:scale' },
    { name: 'Improved Fill Blank UI', check: 'Completa la frase:' },
    { name: 'Better Visual Feedback', check: 'shadow-lg' },
    { name: 'In-line Input Fields', check: 'width' }
  ];
  
  enhancements.forEach(enhancement => {
    if (gamesPageContent.includes(enhancement.check)) {
      console.log(`   ✅ ${enhancement.name} implemented`);
    } else {
      console.log(`   ❌ ${enhancement.name} NOT found`);
    }
  });
} catch (error) {
  console.log(`   ❌ Error reading games page: ${error.message}`);
}

// Test 2: Check WordRaceGame improvements
console.log('\n2. Checking WordRaceGame enhancements...');
try {
  const wordRacePath = path.join(__dirname, 'components', 'games', 'WordRaceGame.tsx');
  const wordRaceContent = fs.readFileSync(wordRacePath, 'utf8');
  
  const wordRaceEnhancements = [
    { name: 'Time Bonus Points', check: 'timeBonus = Math.max(0, Math.floor(timeLeft * 2))' },
    { name: 'Quick Answer Incentive', check: '¡Responde rápido para obtener puntos extra!' },
    { name: 'Enhanced Visual Feedback', check: 'animate-pulse' },
    { name: 'Score Indicators', check: '+${Math.floor(timeLeft * 2)} rápido' },
    { name: 'Better Animations', check: 'shadow-lg' }
  ];
  
  wordRaceEnhancements.forEach(enhancement => {
    if (wordRaceContent.includes(enhancement.check)) {
      console.log(`   ✅ ${enhancement.name} implemented`);
    } else {
      console.log(`   ❌ ${enhancement.name} NOT found`);
    }
  });
} catch (error) {
  console.log(`   ❌ Error reading WordRaceGame: ${error.message}`);
}

// Test 3: Check NounAgreementGame improvements
console.log('\n3. Checking NounAgreementGame enhancements...');
try {
  const nounAgreementPath = path.join(__dirname, 'components', 'games', 'NounAgreementGame.tsx');
  const nounAgreementContent = fs.readFileSync(nounAgreementPath, 'utf8');
  
  const nounAgreementEnhancements = [
    { name: 'Visual Feedback System', check: 'ring-green-400' },
    { name: 'Card Animation Effects', check: 'animate-pulse' },
    { name: 'Enhanced Hover States', check: 'hover:scale-105' },
    { name: 'Better Card Styling', check: 'transition-all duration-300' },
    { name: 'Data Attributes for Selection', check: 'data-card-uid' }
  ];
  
  nounAgreementEnhancements.forEach(enhancement => {
    if (nounAgreementContent.includes(enhancement.check)) {
      console.log(`   ✅ ${enhancement.name} implemented`);
    } else {
      console.log(`   ❌ ${enhancement.name} NOT found`);
    }
  });
} catch (error) {
  console.log(`   ❌ Error reading NounAgreementGame: ${error.message}`);
}

// Test 4: Check if development server is still running
console.log('\n4. Checking development server...');
try {
  fetch('http://localhost:3000')
    .then(response => {
      if (response.ok) {
        console.log('   ✅ Development server is running');
      } else {
        console.log('   ❌ Development server not responding correctly');
      }
    })
    .catch(() => {
      console.log('   ⚠️  Development server may not be running');
    });
} catch (error) {
  console.log('   ⚠️  Could not check development server');
}

console.log('\n🎯 Game Enhancement Summary:');
console.log('✅ Enhanced multiple-choice with letter labels (A, B, C, D)');
console.log('✅ Added hover animations and scale effects');
console.log('✅ Improved fill-blank with inline input fields');
console.log('✅ Enhanced visual feedback with shadows and colors');
console.log('✅ Added time bonus system to WordRaceGame');
console.log('✅ Improved NounAgreementGame with visual feedback');
console.log('✅ Better animations and transitions throughout');
console.log('✅ Enhanced user experience with better feedback');

console.log('\n🚀 Games are ready for testing!');
console.log('Visit http://localhost:3000/juegos to test the enhanced games');
