# Mesh Admin Backend

This is the backend server for the Mesh Admin NPM application, built with Node.js, Express, and TypeScript. It provides a RESTful API for managing users and other resources, with a plugin system for extensibility.

## Development

### Prerequisites

- Node.js v18+
- Yarn or another package manager

### Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy and configure environment variables:
   - Copy `.env.example` to `.env`.
   - Update the `.env` file with necessary configurations.

3. Run the development server:

   ```bash
   pnpm dev
   ```

4. Open your browser and visit `http://localhost:3000`.

## Scripts

- `pnpm dev`: Run the development server with hot reloading using `ts-node-dev`.
- `pnpm build`: Compile TypeScript to JavaScript for production.
- `pnpm start`: Start the compiled production server.
- `pnpm test`: Run the test suite using jest.
- `pnpm test:watch`: Run tests in watch mode.
- `pnpm test:coverage`: Run tests and output code coverage.
- `pnpm lint`: Check the code for linting errors.
- `pnpm lint:fix`: Fix linting errors automatically.

## File Structure

- `src/` - Source code for the backend application.
  - `api` - API route handlers.
  - `config` - Application configuration.
  - `plugins` - Plugin system to extend application functionality.
  - `services` - Business logic and data handling.
  - `lib` - Utilities and helper functions.

## Testing

This project uses Jest and Supertest for testing. All tests are located in the `tests/` directory.

Run tests:

```bash
pnpm test
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
