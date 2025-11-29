require('dotenv').config();
const { generateQuery, prettyPrint, MODELS } = require('../backend/index.js');

// NoSQL schema example (MongoDB)
const schema = 'users(_id, name, email)';
const apiKey = process.env.OPENAI_API_KEY || '<YOUR_OPENAI_KEY>';
const text = 'Find all users with email ending in gmail.com';
const queryType = 'nosql'; // Specify NoSQL explicitly

(async () => {
  try {
    const result = await generateQuery(schema, apiKey, text, MODELS.default, queryType);
    console.log('--- Generated NoSQL Query ---');
    console.log(prettyPrint(result));
  } catch (err) {
    console.error('Error generating query:', err.message);
  }
})();
