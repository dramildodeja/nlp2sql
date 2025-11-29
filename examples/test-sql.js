const { generateQuery, prettyPrint, MODELS } = require('../backend/index.js');
const schema = 'users(id,name,email)';
const apiKey = process.env.API_KEY || '<YOUR_API_KEY>';
const text = 'Get all users with email ending with gmail.com';
(async () => {
  try {
    const result = await generateQuery(schema, apiKey, text, MODELS.default, 'google');
    console.log(prettyPrint(result));
  } catch (err) {
    console.error(err.message);
  }
})();