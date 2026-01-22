/**
 * Script لإضافة المستخدمين الافتراضيين إلى قاعدة البيانات
 * 
 * للتشغيل: npx tsx prisma/seed.ts
 * أو: npx prisma db seed
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // بيانات المستخدمين الافتراضيين
  const defaultUsers = [
    {
      email: 'esconabdou@gmail.com',
      password: 'Esconabdou123',
      role: 'admin',
      username: 'esconabdou',
    },
    {
      email: 'boutibderrahim@gmail.com',
      password: 'Boutibderrahim123',
      role: 'admin',
      username: 'boutibderrahim',
    },
  ];

  for (const userData of defaultUsers) {
    try {
      // تحقق إذا كان المستخدم موجوداً
      const existing = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (existing) {
        console.log(`✅ User ${userData.email} already exists, skipping...`);
      } else {
        // تشفير كلمة المرور قبل الحفظ
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        const user = await prisma.user.create({
          data: {
            ...userData,
            password: hashedPassword,
          },
        });
        console.log(`✅ Created user: ${user.email}`);
      }
    } catch (error) {
      console.error(`❌ Error creating user ${userData.email}:`, error);
    }
  }

  console.log('✨ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
