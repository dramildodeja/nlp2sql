# nlp2sql

Convert natural language into **SQL or NoSQL queries** using multiple AI providers.
Supports CLI, environment variables, Docker, Redis caching, and multiple query types.

---

## Supported Databases

- **SQL**: MySQL, PostgreSQL, SQL Server, SQLite, MariaDB
- **NoSQL**: MongoDB, Firebase Firestore, DynamoDB

---

## Supported AI Providers and Models

| Provider | Model Name | Description | Default |
|----------|-----------|------------|---------|
| Google  | default   | Standard model for balanced output | Yes |
| Google  | flash     | Fast response, lighter output | Optional |
| Google  | lite      | Lightweight, minimal output | Optional |
| OpenAI  | gpt-4     | High quality, advanced reasoning | Optional |
| OpenAI  | gpt-3.5-turbo | Fast, general purpose | Optional |

**Overriding Models and Providers:**

CLI:
```bash
nlp2sql --schema "users(id,name,email)" --apikey "YOUR_KEY" --text "Get all users with gmail.com email" --provider openai --model gpt-4
```

Node.js:
```js
const { generateQuery, MODELS } = require('nlp2sql');
const result = await generateQuery(schema, apiKey, text, MODELS.default, 'openai');
```

> If no model or provider is specified, defaults are `default` model with `google` provider.

---

## Features

- Convert natural language into SQL or MongoDB queries
- Auto-detect SQL vs NoSQL from database schema
- CLI tool with flag-based input
- Pretty-printed query output
- Environment variable support for API key
- Cloud-ready: AWS, GCP, Azure
- Docker support
- Redis caching
- Multi-provider support (Google & OpenAI)
- Model selection (default, flash, lite, gpt-4, gpt-3.5-turbo)

---

## Installation

```bash
npm install -g nlp2sql
```

---

## CLI Usage

```bash
nlp2sql --schema "<DB schema>" --apikey "<API key>" --text "Generate SQL query" --provider <google|openai> --model <model>
```

**Flags:**

| Flag | Description | Required | Default |
|------|-------------|---------|---------|
| `-s, --schema <schema>` | Database schema details | Yes | N/A |
| `-k, --apikey <key>` | API key (or use env variable `API_KEY`) | Conditional | N/A |
| `-t, --text <text>` | Text for query generation | Yes | N/A |
| `-m, --model <model>` | Model to use | No | `default` |
| `-p, --provider <provider>` | AI provider | No | `google` |

---

## Node.js Usage

```js
// Load environment variables
require('dotenv').config();

const { generateQuery, prettyPrint, MODELS } = require('nlp2sql');

// Example database schema and text
const schema = 'users(id,name,email)';
const text = 'Get all users with email ending with gmail.com';

// Use API key from .env (either GOOGLE_API_KEY or OPENAI_API_KEY)
const apiKey = process.env.GOOGLE_API_KEY || process.env.OPENAI_API_KEY;

// Wrap in async function since generateQuery is async
(async () => {
  try {
    const result = await generateQuery(schema, apiKey, text, MODELS.default, 'openai');
    console.log(prettyPrint(result));
  } catch (err) {
    console.error('Error generating query:', err.message);
  }
})();

```

---

## License

Copyright (c) 2025 Dramil M Dodeja

This software is free to use, copy, modify, and distribute for any purpose without restriction.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
