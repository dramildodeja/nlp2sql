const prettyjson = require('prettyjson');
const { OpenAI } = require('openai');

// Available models
const MODELS = {
  default: 'gpt-3.5-turbo', // free-tier default
  gpt35: 'gpt-3.5-turbo',
  gpt4: 'gpt-4',
};

/**
 * Detect query type from schema or type hint
 * @param {string} schema - Database schema
 * @param {string} typeHint - Optional: 'sql', 'nosql', 'soql'
 * @returns {string} query type
 */
function detectQueryType(schema, typeHint) {
  if (typeHint) return typeHint.toLowerCase();
  const lower = schema.toLowerCase();
  if (lower.includes('mongo') || lower.includes('nosql')) return 'nosql';
  if (lower.includes('salesforce') || lower.includes('soql')) return 'soql';
  return 'sql';
}

/**
 * Generate query using OpenAI
 * @param {string} dbSchema - Database schema
 * @param {string} apiKey - OpenAI API key
 * @param {string} text - Natural language description
 * @param {string} model - OpenAI model to use
 * @param {string} typeHint - Optional query type hint
 * @returns {Promise<Object>} { queryType, output }
 */
async function generateQuery(dbSchema, apiKey, text, model = MODELS.default, typeHint) {
  const queryType = detectQueryType(dbSchema, typeHint);

  if (!apiKey) throw new Error('OpenAI API key is required.');

  const openai = new OpenAI({ apiKey });

  const prompt = `Convert this text into a ${queryType.toUpperCase()} query.
DB Schema: ${dbSchema}
Text: ${text}`;

  try {
    const result = await openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
    });

    return { queryType, output: result.choices[0].message.content };
  } catch (err) {
    throw new Error(err.response?.data?.error?.message || err.message);
  }
}

/**
 * Pretty-print query output
 * @param {Object} queryObj
 * @returns {string}
 */
function prettyPrint(queryObj) {
  return prettyjson.render(queryObj, { keysColor: 'cyan', stringColor: 'green' });
}

module.exports = { generateQuery, prettyPrint, MODELS };
