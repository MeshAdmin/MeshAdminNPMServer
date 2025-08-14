// Global test setup
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'error'; // Reduce log noise in tests
process.env.PORT = '3001';
process.env.CORS_ORIGIN = 'http://localhost:3000';
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_EXPIRES_IN = '1h';

// Add any global test utilities here
global.console = {
  ...console,
  // Uncomment to silence console logs in tests
  // log: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};
