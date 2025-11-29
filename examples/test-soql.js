require('dotenv').config();
const { generateQuery, prettyPrint, MODELS } = require('../backend/index.js');

// Salesforce schema example
const schema = 'Account(Id, Name, Email)';
const apiKey = process.env.OPENAI_API_KEY || '<YOUR_OPENAI_KEY>';
const text = 'Get all accounts with email ending in gmail.com';
const queryType = 'soql'; // Specify SOQL explicitly

(async () => {
  try {
    const result = await generateQuery(schema, apiKey, text, MODELS.default, queryType);
    console.log('--- Generated Query ---');
    console.log(prettyPrint(result));
  } catch (err) {
    console.error('Error generating query:', err.message);
  }
})();
