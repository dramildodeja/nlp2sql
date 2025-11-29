# nlp2sql

Convert natural language into **SQL, NoSQL, or SOQL queries**.  
Supports CLI, environment variables, Docker, Redis caching, and multiple query types.

---

## Supported Databases / Query Types

- **SQL**: MySQL, PostgreSQL, SQL Server, SQLite, MariaDB
- **NoSQL**: MongoDB, Firebase Firestore, DynamoDB
- **SOQL**: Salesforce Objects (Accounts, Contacts, custom objects)

---

## Supported AI Provider and Models

### OpenAI
- Models: `gpt-3.5-turbo` (default, free tier), `gpt-4`

**Overriding Models:**

CLI:
nlp2sql --schema "Account(Id, Name, Email)" --apikey "YOUR_OPENAI_KEY" --text "Get all accounts with gmail.com email" --type soql --model gpt-4

Node.js:
const { generateQuery, MODELS } = require('nlp2sql');
const result = await generateQuery(schema, apiKey, text, MODELS.gpt4, 'soql');

> If no model or type is specified, defaults are `gpt-3.5-turbo` and query type auto-detected from schema.

---

## Features

- Convert natural language into SQL, NoSQL, or SOQL queries
- Auto-detect SQL vs NoSQL vs SOQL from database/schema or explicit type
- CLI tool with flag-based input
- Pretty-printed query output
- Environment variable support for OpenAI API key
- Cloud-ready: AWS, GCP, Azure
- Docker support
- Redis caching
- Model selection (default free-tier `gpt-3.5-turbo`, `gpt-4`)

---

## Installation

npm install -g @dramildodeja/nlp2sql

---

## CLI Usage

### Text → SQL (MySQL/PostgreSQL/etc.)
```
nlp2sql --schema "users(id,name,email)" \
        --apikey "YOUR_OPENAI_KEY" \
        --text "Get all users with email ending in gmail.com" \
        --model gpt-3.5-turbo \
        --type sql
```
### Text → NoSQL (MongoDB/DynamoDB/Firestore)
```
nlp2sql --schema "users(_id,name,email)" \
        --apikey "YOUR_OPENAI_KEY" \
        --text "Find all users with email ending in gmail.com" \
        --model gpt-3.5-turbo \
        --type nosql
```
### Text → SOQL (Salesforce)
```
nlp2sql --schema "Account(Id, Name, Email)" \
        --apikey "YOUR_OPENAI_KEY" \
        --text "Get all accounts with gmail.com email" \
        --model gpt-3.5-turbo \
        --type soql
```

**Flags:**

Flag | Description | Required | Default
-----|------------|---------|--------
-s, --schema <schema> | Database schema details | Yes | N/A
-k, --apikey <key> | OpenAI API key (or use env variable `OPENAI_API_KEY`) | Conditional | N/A
-t, --text <text> | Text for query generation | Yes | N/A
-m, --model <model> | Model to use | No | `gpt-3.5-turbo`
--type <sql|nosql|soql> | Query type | No | auto-detected

---

## Running Example Scripts

Your `examples/` folder includes ready-to-run scripts for SQL, NoSQL, and SOQL queries.  
Make sure you have set your OpenAI API key in a `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key_here
DEFAULT_MODEL=gpt-3.5-turbo
```

### SQL Example
node examples/test-sql.js

### NoSQL Example
node examples/test-nosql.js

### SOQL Example
node examples/test-soql.js

---

## Node.js Usage

require('dotenv').config();
const { generateQuery, prettyPrint, MODELS } = require('nlp2sql');

const schema = 'Account(Id, Name, Email)';
const text = 'Get all accounts with gmail.com email';
const apiKey = process.env.OPENAI_API_KEY || '<YOUR_OPENAI_KEY>';
const queryType = 'sql'; // optional: 'sql', 'nosql', 'soql'

(async () => {
  try {
    const result = await generateQuery(schema, apiKey, text, MODELS.default, queryType);
    console.log(prettyPrint(result));
  } catch (err) {
    console.error('Error generating query:', err.message);
  }
})();

> Note: Only OpenAI provider is supported.

---

## Environment Variables

Create a `.env` file in your project root:

OPENAI_API_KEY=your_openai_api_key_here
DEFAULT_MODEL=gpt-3.5-turbo

---

## License

Copyright (c) 2025 Dramil M Dodeja

This software is free to use, copy, modify, and distribute for any purpose without restriction.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
