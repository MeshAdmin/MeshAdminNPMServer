// AI Provider Integration Setup (temporarily disabled to fix startup)
// const openai = require('openai'); // Assume existing module
// const anthropic = require('anthropic'); // Assume existing module
// const google = require('google-ai'); // Assume existing module
// const perplexity = require('perplexity-ai'); // Assume existing module
// const grok = require('grok-ai'); // Assume existing module

// Local LLM integrations (temporarily disabled)
// const ollama = require('ollama');
// const picoMLX = require('picomlx');
// const lmStudio = require('lmStudio');

// Configuration for Providers
const providersConfig = {
  openai: { apiKey: process.env.OPENAI_API_KEY },
  anthropic: { apiKey: process.env.ANTHROPIC_API_KEY },
  google: { apiKey: process.env.GOOGLE_API_KEY },
  perplexity: { apiKey: process.env.PERPLEXITY_API_KEY },
  grok: { apiKey: process.env.GROK_API_KEY },
  ollama: { modelPath: '/local/models/ollama' },
  picoMLX: { modelPath: '/local/models/picoMLX' },
  lmStudio: { modelPath: '/local/models/lmStudio' },
};

module.exports = providersConfig;
