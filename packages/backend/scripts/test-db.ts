import { PrismaClient } from '../src/generated/prisma';

async function testDatabase() {
  const prisma = new PrismaClient();

  try {
    console.log('🔍 Testing database connection...');

    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // Check if admin user exists
    const adminUser = await prisma.user.findFirst({
      where: { role: 'admin' },
    });

    if (adminUser) {
      console.log('✅ Admin user found:', {
        id: adminUser.id,
        username: adminUser.username,
        email: adminUser.email,
        role: adminUser.role,
        isActive: adminUser.isActive,
        createdAt: adminUser.createdAt,
      });
    } else {
      console.log('❌ No admin user found');
    }

    // Count all models
    const userCount = await prisma.user.count();
    const serviceCount = await prisma.service.count();
    const packageActionCount = await prisma.packageAction.count();
    const logEntryCount = await prisma.logEntry.count();
    const metricSampleCount = await prisma.metricSample.count();
    const domainCount = await prisma.domain.count();
    const certificateCount = await prisma.certificate.count();
    const pluginCount = await prisma.plugin.count();

    console.log('📊 Database statistics:');
    console.log(`  Users: ${userCount}`);
    console.log(`  Services: ${serviceCount}`);
    console.log(`  Package Actions: ${packageActionCount}`);
    console.log(`  Log Entries: ${logEntryCount}`);
    console.log(`  Metric Samples: ${metricSampleCount}`);
    console.log(`  Domains: ${domainCount}`);
    console.log(`  Certificates: ${certificateCount}`);
    console.log(`  Plugins: ${pluginCount}`);

    console.log('🎉 Database integration test completed successfully!');
  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testDatabase().catch(console.error);
