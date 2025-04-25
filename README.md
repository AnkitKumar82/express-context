# Express Context
A lightweight and type-safe HTTP context helper for Express, built using Node.js’s native AsyncLocalStorage. It allows you to safely store and access per-request data (like user info, trace IDs, etc.) across your entire app — including in async functions and services.

## Installation
```shell
$ npm install --save @k_ankit/express-context
```

## Why Use This?
  Keep track of per-request data without passing it manually
  Built on top of AsyncLocalStorage (no external dependencies)
  Type-safe and easy to use
  Framework-agnostic, but designed for Express

## Usage
1. Import the helpers

```typescript
import { contextMiddleware, getContext, setContext } from '@k_ankit/express-context';
import express from 'express';
```

2. Register the middleware
Place the contextMiddleware early in your Express app or specific routes:

```typescript
const app = express();
app.use(contextMiddleware); // Global registration
```

Or apply it per route:


```typescript
const TestRouter = express.Router();

TestRouter.get('/test', contextMiddleware, (req, res) => {
  setContext('key', { value: 'test' });

  const data = getContext<{ value: string }>('key');
  console.log(data); // { value: 'test' }

  res.send('Context stored!');
});
```

## API
`contextMiddleware(req, res, next)` : Initializes async context for each request. Required before using setContext or getContext.

`setContext(key: string, value: any)` : Stores a value in the current request’s context.

`getContext<T = any>(key: string): T | undefined` : Retrieves the value for a given key from the current request’s context.