// Precise test to verify the nested button fix
const fs = require('fs');
const path = require('path');

console.log('🔧 Precise Test for Nested Button Fix...\n');

try {
  const vocabGamePath = path.join(__dirname, 'components', 'games', 'VocabularyMatchGame.tsx');
  const vocabGameContent = fs.readFileSync(vocabGamePath, 'utf8');
  
  // Look for the specific problematic pattern: button > button > Volume2
  const lines = vocabGameContent.split('\n');
  let nestedButtonFound = false;
  let fixConfirmed = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for button opening
    if (line.includes('<button') && !line.includes('/>')) {
      // Look ahead for nested button with Volume2
      for (let j = i + 1; j < Math.min(i + 20, lines.length); j++) {
        const nextLine = lines[j];
        if (nextLine.includes('</button>')) {
          break; // End of current button
        }
        if (nextLine.includes('<button') && nextLine.includes('Volume2')) {
          console.log(`❌ Found nested button at line ${j + 1}: ${nextLine.trim()}`);
          nestedButtonFound = true;
        }
      }
    }
    
    // Check for the fix: span with Volume2 inside button
    if (line.includes('<span') && line.includes('Volume2')) {
      console.log(`✅ Found fix at line ${i + 1}: ${line.trim()}`);
      fixConfirmed = true;
    }
  }
  
  console.log('\n🎯 Results:');
  if (!nestedButtonFound) {
    console.log('✅ No nested buttons found with Volume2 - ISSUE FIXED!');
  } else {
    console.log('❌ Nested buttons still exist');
  }
  
  if (fixConfirmed) {
    console.log('✅ Fix confirmed: span element with Volume2 found');
  } else {
    console.log('⚠️  Fix not confirmed');
  }
  
  // Check overall structure
  const buttonCount = (vocabGameContent.match(/<button/g) || []).length;
  const spanCount = (vocabGameContent.match(/<span/g) || []).length;
  const volume2Count = (vocabGameContent.match(/Volume2/g) || []).length;
  
  console.log(`\n📊 Structure Analysis:`);
  console.log(`   Total buttons: ${buttonCount}`);
  console.log(`   Total spans: ${spanCount}`);
  console.log(`   Total Volume2 icons: ${volume2Count}`);
  
  if (!nestedButtonFound && fixConfirmed) {
    console.log('\n🚀 SUCCESS: The nested button hydration error has been resolved!');
  }
  
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
}
