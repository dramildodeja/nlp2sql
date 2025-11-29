#!/usr/bin/env node
const { program } = require('commander');
const { generateQuery, prettyPrint, MODELS } = require('../backend/index.js');
require('dotenv').config();

program
  .name('nlp2sql')
  .description('Convert natural language to SQL/NoSQL queries')
  .version('1.3.0')
  .requiredOption('-s, --schema <schema>', 'Database schema details')
  .option('-k, --apikey <key>', 'API key (or set API_KEY env variable)')
  .requiredOption('-t, --text <text>', 'Text for query generation')
  .option('-m, --model <model>', 'Model to use: default|flash|lite', 'default')
  .option('-p, --provider <provider>', 'AI provider: google|openai', 'google')
  .parse(process.argv);

const options = program.opts();
const apiKey = options.apikey || process.env.API_KEY;
if (!apiKey) { console.error('Error: API key is required.'); process.exit(1); }
(async () => {
  try {
    const result = await generateQuery(options.schema, apiKey, options.text, MODELS[options.model] || MODELS.default, options.provider);
    console.log(prettyPrint(result));
  } catch (err) {
    console.error('Error generating query:', err.message);
  }
})();