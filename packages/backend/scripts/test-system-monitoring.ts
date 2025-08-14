#!/usr/bin/env npx tsx

import { systemMonitoringService } from '../src/services/system-monitoring.service';
import { redisService } from '../src/services/redis.service';
import logger from '../src/lib/logger';

async function testSystemMonitoring() {
  try {
    console.log('🧪 Testing System Monitoring Service...\n');

    // Test system info collection
    console.log('📊 Testing metric collection...');

    // Start monitoring for a short period
    await systemMonitoringService.start();
    console.log('✅ System monitoring started');

    // Wait for a few metrics to be collected
    console.log('⏱️  Waiting 15 seconds for metrics collection...');
    await new Promise(resolve => setTimeout(resolve, 15000));

    // Test getting latest metrics
    const latest = await systemMonitoringService.getLatestMetrics();
    if (latest) {
      console.log('✅ Latest metrics retrieved:');
      console.log(`   CPU Usage: ${latest.cpu.usage.toFixed(1)}%`);
      console.log(`   Memory Usage: ${latest.memory.usage.toFixed(1)}%`);
      console.log(`   Disk Usage: ${latest.disk.usage.toFixed(1)}%`);
      console.log(`   Network Interfaces: ${latest.network.interfaces.length}`);
      console.log(`   Timestamp: ${new Date(latest.timestamp).toISOString()}`);
    } else {
      console.log('❌ No latest metrics available');
    }

    // Test historical metrics
    const history = await systemMonitoringService.getHistoricalMetrics(5);
    console.log(`✅ Retrieved ${history.length} historical metrics`);

    // Test Redis connection
    if (redisService.isConnected()) {
      console.log('✅ Redis is connected');
    } else {
      console.log('⚠️  Redis is not connected');
    }

    // Test service status
    console.log(`✅ Monitoring service uptime: ${systemMonitoringService.getUptime()} seconds`);
    console.log(`✅ Monitoring service running: ${systemMonitoringService.isRunning()}`);

    // Stop monitoring
    await systemMonitoringService.stop();
    console.log('✅ System monitoring stopped');

    console.log('\n🎉 All tests completed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  } finally {
    // Cleanup
    try {
      await systemMonitoringService.stop();
      await redisService.disconnect();
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    }
    process.exit(0);
  }
}

// Run the test
testSystemMonitoring();
