import { CodeBlock } from "@/components/code-block";

export default function UsagePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Usage Patterns</h1>

            <p className="text-lg text-muted-foreground">
                Notaify offers multiple ways to capture errors depending on your preference and framework. Choose the one that fits your workflow best.
            </p>

            <div className="space-y-4 mt-8">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">1. Global Auto-Capture</h2>
                <p className="text-foreground">
                    The simplest and most powerful approach. After calling <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">notaify.init()</code>, all unhandled errors and unhandled promise rejections in your app are automatically captured and reported — no try-catch needed anywhere.
                </p>

                <div className="not-prose mt-4">
                    <CodeBlock
                        language="javascript"
                        code={`// index.js / server.js
import { notaify } from '@notaify/node'

notaify.init({
  apiKey: process.env.NOTAIFY_API_KEY,
  password: process.env.NOTAIFY_PASSWORD
})

// That's it. Every unhandled error from this point is auto-reported.`}
                    />
                </div>

                <div className="rounded-md border p-4 bg-muted/50 mt-4 text-sm">
                    <strong>Best for:</strong> Any Node.js app where you want zero-effort, blanket error coverage.
                </div>
            </div>

            <div className="space-y-4 mt-12">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">2. Manual Capture</h2>
                <p className="text-foreground">
                    For fine-grained control. Use this inside a try-catch when you want to handle the error yourself but also report it to Notaify.
                </p>

                <div className="not-prose mt-4">
                    <CodeBlock
                        language="javascript"
                        code={`import { notaify } from '@notaify/node'

try {
  await riskyOperation()
} catch (error) {
  // Report to notaify
  await notaify.capture(error)
  
  // optionally re-throw or handle gracefully
}`}
                    />
                </div>

                <p className="text-foreground mt-4">You can also pass additional context to be included in your reports:</p>

                <div className="not-prose mt-4">
                    <CodeBlock
                        language="javascript"
                        code={`await notaify.capture(error, {
  userId: '123',
  route: '/api/payment',
  severity: 'critical'
})`}
                    />
                </div>

                <div className="rounded-md border p-4 bg-muted/50 mt-4 text-sm">
                    <strong>Best for:</strong> Specific critical operations where you want targeted error reporting with extra context.
                </div>
            </div>

            <div className="space-y-4 mt-12">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">3. Async Handler Wrapper</h2>
                <p className="text-foreground">
                    Wraps any async route handler. If an error is thrown inside, it is automatically captured and reported. Clean, no try-catch boilerplate.
                </p>

                <div className="not-prose mt-4">
                    <CodeBlock
                        language="javascript"
                        code={`import { notaifyHandler } from '@notaify/node'

// Express
app.get('/users', notaifyHandler(async (req, res) => {
  const users = await db.getUsers()
  res.json(users)
}))

// Next.js API Route
export const GET = notaifyHandler(async (req) => {
  const data = await fetchData()
  return Response.json(data)
})`}
                    />
                </div>

                <div className="rounded-md border p-4 bg-muted/50 mt-4 text-sm">
                    <strong>Best for:</strong> Next.js API routes, individual Express routes, or any async function where you want per-route error capture without boilerplate.
                </div>
            </div>

            <div className="space-y-4 mt-12 mb-8">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">4. Express / Fastify Error Middleware</h2>
                <p className="text-foreground">
                    Plug Notaify into your Express or Fastify app as error-handling middleware. Any error passed to <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">next(error)</code> in Express, or thrown in a Fastify route, is automatically captured.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 not-prose text-foreground p-1">
                    <CodeBlock
                        language="express"
                        code={`import express from 'express'
import { notaifyMiddleware } from '@notaify/node'

const app = express()

// your routes
app.get('/route', async (req, res, next) => {
  try {
    await doSomething()
  } catch (err) {
    next(err) // passes to middleware
  }
})

// Add AFTER all routes
app.use(notaifyMiddleware())`}
                    />

                    <CodeBlock
                        language="fastify"
                        code={`import Fastify from 'fastify'
import { notaifyMiddleware } from '@notaify/node'

const fastify = Fastify()

fastify.setErrorHandler(
  notaifyMiddleware()
)

// route definitions...`}
                    />
                </div>

                <div className="rounded-md border p-4 bg-muted/50 mt-4 text-sm mt-8">
                    <strong>Best for:</strong> Express and Fastify apps where you want centralized error handling in one place.
                </div>
            </div>
        </div>
    );
}
