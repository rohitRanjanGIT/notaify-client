# @notaify/node — Documentation

## What is Notaify?

Notaify is an error notification service for backend applications. When an error occurs in your server, Notaify captures it, runs an AI-powered analysis to help you understand what went wrong, and instantly sends you an email alert — so you can fix issues before your users even notice.

---

## Installation

```bash
npm install @notaify/node
```

---

## Setup

Add your Notaify credentials to your `.env` file:

```env
NOTAIFY_API_KEY=your_api_key
NOTAIFY_PASSWORD=your_password
```

You can get your API key and password from your [Notaify Dashboard](https://notaify.com/dashboard).

---

## Initialization

Before using any feature, initialize Notaify once at the entry point of your application:

```js
import { notaify } from '@notaify/node'

notaify.init({
  apiKey: process.env.NOTAIFY_API_KEY,
  password: process.env.NOTAIFY_PASSWORD
})
```

---

## Usage Patterns

Notaify offers multiple ways to capture errors depending on your preference and framework. Choose the one that fits your workflow best.

---

### 1. Global Auto-Capture (`notaify.init`)

The simplest and most powerful approach. After calling `notaify.init()`, all unhandled errors and unhandled promise rejections in your app are automatically captured and reported — no try-catch needed anywhere.

```js
// index.js / server.js
import { notaify } from '@notaify/node'

notaify.init({
  apiKey: process.env.NOTAIFY_API_KEY,
  password: process.env.NOTAIFY_PASSWORD
})

// That's it. Every unhandled error from this point is auto-reported.
```

**Best for:** Any Node.js app where you want zero-effort, blanket error coverage.

---

### 2. Manual Capture (`notaify.capture`)

For fine-grained control. Use this inside a try-catch when you want to handle the error yourself but also report it to Notaify.

```js
import { notaify } from '@notaify/node'

try {
  await riskyOperation()
} catch (error) {
  await notaify.capture(error)
  // optionally re-throw or handle gracefully
}
```

You can also pass additional context:

```js
await notaify.capture(error, {
  userId: '123',
  route: '/api/payment',
  severity: 'critical'
})
```

**Best for:** Specific critical operations where you want targeted error reporting with extra context.

---

### 3. Async Handler Wrapper (`notaifyHandler`)

Wraps any async route handler. If an error is thrown inside, it is automatically captured and reported. Clean, no try-catch boilerplate.

```js
import { notaifyHandler } from '@notaify/node'

// Express
app.get('/users', notaifyHandler(async (req, res) => {
  const users = await db.getUsers()
  res.json(users)
}))

// Next.js API Route
export const GET = notaifyHandler(async (req) => {
  const data = await fetchData()
  return Response.json(data)
})
```

**Best for:** Next.js API routes, individual Express routes, or any async function where you want per-route error capture without boilerplate.

---

### 4. Express / Fastify Error Middleware (`notaifyMiddleware`)

Plug Notaify into your Express or Fastify app as error-handling middleware. Any error passed to `next(error)` in Express, or thrown in a Fastify route, is automatically captured.

**Express:**
```js
import express from 'express'
import { notaifyMiddleware } from '@notaify/node'

const app = express()

// your routes
app.get('/route', async (req, res, next) => {
  try {
    await doSomething()
  } catch (err) {
    next(err) // passes to notaify middleware
  }
})

// Add AFTER all routes
app.use(notaifyMiddleware())
```

**Fastify:**
```js
import Fastify from 'fastify'
import { notaifyMiddleware } from '@notaify/node'

const fastify = Fastify()

fastify.setErrorHandler(notaifyMiddleware())
```

**Best for:** Express and Fastify apps where you want centralized error handling in one place.

---

## Framework Quick Start Guides

### Express

```js
import express from 'express'
import { notaify, notaifyMiddleware } from '@notaify/node'

notaify.init({
  apiKey: process.env.NOTAIFY_API_KEY,
  password: process.env.NOTAIFY_PASSWORD
})

const app = express()

app.get('/', async (req, res) => {
  res.send('Hello World')
})

app.use(notaifyMiddleware())
app.listen(3000)
```

---

### Fastify

```js
import Fastify from 'fastify'
import { notaify, notaifyMiddleware } from '@notaify/node'

notaify.init({
  apiKey: process.env.NOTAIFY_API_KEY,
  password: process.env.NOTAIFY_PASSWORD
})

const fastify = Fastify()
fastify.setErrorHandler(notaifyMiddleware())

fastify.get('/', async () => ({ hello: 'world' }))
fastify.listen({ port: 3000 })
```

---

### Next.js (App Router)

```js
// app/api/users/route.ts
import { notaify, notaifyHandler } from '@notaify/node'

notaify.init({
  apiKey: process.env.NOTAIFY_API_KEY,
  password: process.env.NOTAIFY_PASSWORD
})

export const GET = notaifyHandler(async (req) => {
  const users = await db.getUsers()
  return Response.json(users)
})
```

> **Note:** Notaify only works server-side. Never use it in client components or the browser.

---

### NestJS

```js
// main.ts
import { notaify } from '@notaify/node'

notaify.init({
  apiKey: process.env.NOTAIFY_API_KEY,
  password: process.env.NOTAIFY_PASSWORD
})

// In an exception filter
import { Catch, ArgumentsHost } from '@nestjs/common'
import { notaify } from '@notaify/node'

@Catch()
export class NotaifyExceptionFilter {
  async catch(exception: unknown, host: ArgumentsHost) {
    await notaify.capture(exception as Error)
    // handle response
  }
}
```

---

## Configuration Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `apiKey` | `string` | Yes | Your Notaify API key |
| `password` | `string` | Yes | Your Notaify password |
| `environment` | `string` | No | e.g. `"production"`, `"staging"` (default: `"production"`) |
| `appName` | `string` | No | Label your app in the dashboard and emails |
| `silent` | `boolean` | No | Suppress Notaify console logs (default: `false`) |

```js
notaify.init({
  apiKey: process.env.NOTAIFY_API_KEY,
  password: process.env.NOTAIFY_PASSWORD,
  environment: 'production',
  appName: 'My API Server',
  silent: true
})
```

---

## What You Receive in the Email

When an error is captured, Notaify sends you an email containing:

- **Error message** and **stack trace**
- **AI analysis** — a plain-English explanation of what went wrong and suggested fixes
- **Timestamp** and **environment**
- **Extra context** you passed via `notaify.capture(error, context)`
- **App name** if configured

---

## Security

- Your `NOTAIFY_API_KEY` and `NOTAIFY_PASSWORD` are used only to authenticate with the Notaify server
- Never expose these in client-side code or commit them to version control
- Always load them from environment variables

---

## Need Help?

- Dashboard: [notaify.com/dashboard](https://notaify.com/dashboard)
- Support: support@notaify.com
- GitHub: [github.com/notaify/node](https://github.com/notaify/node)
