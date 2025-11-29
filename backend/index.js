const axios = require('axios');
const prettyjson = require('prettyjson');

const MODELS = {
  default: 'gemini-2.5',
  flash: 'gemini-2.5-flash',
  lite: 'gemini-2.5-flash-lite'
};

function detectQueryType(schema) {
  const lower = schema.toLowerCase();
  if (lower.includes('mongo') || lower.includes('nosql')) return 'NoSQL';
  return 'SQL';
}

async function generateQuery(dbSchema, apiKey, text, model = MODELS.default, provider = 'google') {
  const queryType = detectQueryType(dbSchema);

  if (provider === 'google') {
    const headers = { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' };
    const payload = {
      model,
      prompt: `Convert this text to a ${queryType} query.\nDB Schema: ${dbSchema}\nText: ${text}`,
      temperature: 0.2
    };
    try {
      const response = await axios.post(`https://api.generativeai.google/v1beta/models/${model}:generateText`, payload, { headers });
      return { queryType, output: response.data.output_text || response.data.choices?.[0]?.text || 'No output returned' };
    } catch (err) {
      throw new Error(err.response?.data?.error?.message || err.message);
    }
  }
  else if (provider === 'openai') {
    const OpenAI = require('openai');
    const openai = new OpenAI({ apiKey });
    try {
      const result = await openai.chat.completions.create({
        model,
        messages: [{ role: 'user', content: `Convert this text to a ${queryType} query.\nDB Schema: ${dbSchema}\nText: ${text}` }]
      });
      return { queryType, output: result.choices[0].message.content };
    } catch (err) {
      throw new Error(err.message);
    }
  } else {
    throw new Error('Unsupported provider. Use "google" or "openai".');
  }
}

function prettyPrint(queryObj) {
  return prettyjson.render(queryObj, { keysColor: 'cyan', stringColor: 'green' });
}

module.exports = { generateQuery, prettyPrint, MODELS };