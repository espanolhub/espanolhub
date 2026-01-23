/**
 * Script لإعادة تعيين كلمة مرور الأدمن
 * 
 * للتشغيل: npx tsx scripts/reset-admin-password.ts
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'esconabdou@gmail.com';
  const newPassword = 'Esconabdou123.'; // مع النقطة في النهاية

  console.log('🔐 Resetting admin password...');
  console.log(`📧 Email: ${email}`);
  console.log(`🔑 New password: ${newPassword.replace(/./g, '*')} (${newPassword.length} characters)`);

  try {
    // التحقق من وجود المستخدم
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      console.error(`❌ User with email ${email} not found!`);
      console.log('💡 Creating new admin user...');
      
      // إنشاء مستخدم جديد إذا لم يكن موجوداً
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const newUser = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          password: hashedPassword,
          role: 'admin',
          username: 'esconabdou',
        },
      });
      console.log(`✅ Created new admin user: ${newUser.email}`);
      console.log('✨ Password reset completed!');
      return;
    }

    // تحديث كلمة المرور
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const updatedUser = await prisma.user.update({
      where: { email: email.toLowerCase() },
      data: {
        password: hashedPassword,
        role: 'admin', // التأكد من أن الدور هو admin
      },
    });

    console.log(`✅ Password updated successfully for: ${updatedUser.email}`);
    console.log(`✅ Role: ${updatedUser.role}`);
    console.log('✨ Password reset completed!');
    console.log('');
    console.log('🔍 You can now login with:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${newPassword}`);
  } catch (error) {
    console.error('❌ Error resetting password:', error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error('❌ Script error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
