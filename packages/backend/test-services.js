const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Test service endpoints
async function testServiceEndpoints() {
  try {
    console.log('🧪 Testing Service Management Endpoints...\n');

    // First, login to get a token
    console.log('1. Login to get auth token...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      username: 'admin',
      password: 'admin123',
    });

    const authToken = loginResponse.data.data.accessToken;
    console.log('✅ Login successful');

    const headers = { Authorization: `Bearer ${authToken}` };

    // Test GET /api/services
    console.log('\n2. Testing GET /api/services...');
    const servicesResponse = await axios.get(`${BASE_URL}/services`, { headers });
    console.log(`✅ Got ${servicesResponse.data.data.length} services`);

    const serviceId = servicesResponse.data.data[0]?.id;
    if (serviceId) {
      // Test GET /api/services/:id
      console.log('\n3. Testing GET /api/services/:id...');
      const serviceResponse = await axios.get(`${BASE_URL}/services/${serviceId}`, { headers });
      console.log(`✅ Got service: ${serviceResponse.data.data.name}`);

      // Test service actions
      console.log('\n4. Testing service actions...');
      const startResponse = await axios.post(
        `${BASE_URL}/services/${serviceId}/start`,
        {},
        { headers }
      );
      console.log(`✅ Start action: ${startResponse.data.data.status}`);

      // Test GET /api/services/:id/logs
      console.log('\n5. Testing GET /api/services/:id/logs...');
      const logsResponse = await axios.get(`${BASE_URL}/services/${serviceId}/logs?lines=5`, {
        headers,
      });
      console.log(`✅ Got ${logsResponse.data.data.length} log entries`);
    }

    // Test POST /api/services (create new service)
    console.log('\n6. Testing POST /api/services (create)...');
    const newService = await axios.post(
      `${BASE_URL}/services`,
      {
        name: 'test-service-' + Date.now(),
        description: 'Test service created by API test',
        type: 'pm2',
        config: { port: 4000, env: 'test' },
      },
      { headers }
    );
    console.log(`✅ Created service: ${newService.data.data.name}`);

    // Test server stats endpoint
    console.log('\n7. Testing GET /api/server/stats...');
    const statsResponse = await axios.get(`${BASE_URL}/server/stats`, { headers });
    console.log(`✅ Got server stats: ${statsResponse.data.data.cpu.usage}% CPU`);

    console.log('\n🎉 All service endpoint tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

testServiceEndpoints();
