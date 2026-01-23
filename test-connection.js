/**
 * ملف اختبار الاتصال بقاعدة البيانات
 * Test database connection script
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔄 جاري اختبار الاتصال...');
    console.log('🔄 Testing connection...');
    
    // محاولة الاتصال
    await prisma.$connect();
    console.log('✅ الاتصال نجح!');
    console.log('✅ Connection successful!');
    
    // اختبار query بسيط
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('📊 Database version:', result[0]?.version || 'Unknown');
    
    // التحقق من وجود جدول users
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    console.log('\n📋 الجداول الموجودة / Existing tables:');
    tables.forEach(table => {
      console.log(`  - ${table.table_name}`);
    });
    
    console.log('\n✨ الاختبار نجح!');
    console.log('✨ Test passed!');
    
  } catch (error) {
    console.error('\n❌ خطأ في الاتصال / Connection error:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    if (error.code === 'P1001') {
      console.error('\n💡 الحلول المقترحة / Suggested solutions:');
      console.error('1. تحقق من أن Supabase project نشط');
      console.error('2. جرب استخدام Pooler connection بدلاً من Direct');
      console.error('3. تحقق من كلمة المرور في DATABASE_URL');
      console.error('4. تأكد من أن الإنترنت يعمل');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
