/**
 * اختبار الاتصال باستخدام Pooler
 * Test connection using Pooler
 */

// جرب هذا التنسيق مع Pooler
const testUrls = [
  // Pooler connection (موصى به)
  'postgresql://postgres.hiylvlmjnlhcflzdrtjk:Esconabdou123.@aws-0-eu-central-1.pooler.supabase.com:6543/postgres',
  'postgresql://postgres.hiylvlmjnlhcflzdrtjk:Esconabdou123.@db.hiylvlmjnlhcflzdrtjk.supabase.co:6543/postgres',
  
  // Direct connection (الحالي)
  'postgresql://postgres:Esconabdou123.@db.hiylvlmjnlhcflzdrtjk.supabase.co:5432/postgres',
];

console.log('🔍 جاري اختبار الاتصالات المختلفة...\n');

testUrls.forEach((url, index) => {
  console.log(`\n📡 اختبار ${index + 1}:`);
  console.log(`URL: ${url.replace(/:[^:@]+@/, ':****@')}`);
  
  // هذا للعرض فقط - يحتاج تحديث .env فعلياً
});

console.log('\n💡 التعليمات:');
console.log('1. اذهب إلى Supabase Dashboard');
console.log('2. Settings → Database');
console.log('3. انسخ Connection String (Transaction mode)');
console.log('4. استبدل DATABASE_URL في .env');
