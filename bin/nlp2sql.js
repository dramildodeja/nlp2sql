#!/usr/bin/env node
const { program } = require('commander');
const { generateQuery, prettyPrint, MODELS } = require('../backend/index.js');
require('dotenv').config();

program
  .name('nlp2sql')
  .description('Convert natural language to SQL, NoSQL, or SOQL queries using OpenAI')
  .version('1.8.0')
  .requiredOption('-s, --schema <schema>', 'Database schema details')
  .option('-k, --apikey <key>', 'OpenAI API key (or set OPENAI_API_KEY env variable)')
  .requiredOption('-t, --text <text>', 'Text for query generation')
  .option('-m, --model <model>', 'Model to use: gpt-3.5-turbo|gpt-4', 'gpt-3.5-turbo')
  .option('--type <sql|nosql|soql>', 'Query type (auto-detected if not specified)')
  .parse(process.argv);

const options = program.opts();
const apiKey = options.apikey || process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('Error: OpenAI API key is required.');
  process.exit(1);
}

(async () => {
  try {
    const result = await generateQuery(
      options.schema,
      apiKey,
      options.text,
      MODELS[options.model] || MODELS.default,
      options.type
    );
    console.log(prettyPrint(result));
  } catch (err) {
    console.error('Error generating query:', err.message);
  }
})();