import { CodeBlock } from "@/components/code-block";

export default function FrameworksPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Framework Quick Start Guides</h1>

      <p className="text-lg text-muted-foreground">
        Find the recommended integration path for your specific framework.
      </p>

      <div className="space-y-4 mt-8">
        <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Express</h2>

        <div className="not-prose mt-4">
          <CodeBlock
            language="javascript"
            code={`import express from 'express'
import notaify, { notaifyMiddleware } from '@notaify/node'

notaify.init({
  apiKeyId: process.env.NOTAIFY_API_KEY_ID,
  apiKey: process.env.NOTAIFY_API_KEY,
})

const app = express()

app.get('/', async (req, res) => {
  res.send('Hello World')
})

app.use(notaifyMiddleware())
app.listen(3000)`}
          />
        </div>
      </div>

      <div className="space-y-4 mt-12">
        <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Fastify</h2>

        <div className="not-prose mt-4">
          <CodeBlock
            language="javascript"
            code={`import Fastify from 'fastify'
import notaify, { notaifyMiddleware } from '@notaify/node'

notaify.init({
  apiKeyId: process.env.NOTAIFY_API_KEY_ID,
  apiKey: process.env.NOTAIFY_API_KEY,
})

const fastify = Fastify()

// Set notaify as the global error handler
fastify.setErrorHandler(notaifyMiddleware({ framework: 'fastify' }))

fastify.get('/', async () => ({ hello: 'world' }))
fastify.listen({ port: 3000 })`}
          />
        </div>
      </div>

      <div className="space-y-4 mt-12">
        <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Next.js (App Router)</h2>

        <p className="text-foreground">
          Use the <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">notaifyHandler</code> to wrap individual API route handlers.
        </p>

        <div className="not-prose mt-4">
          <CodeBlock
            language="typescript"
            code={`// app/api/users/route.ts
import notaify, { notaifyHandler } from '@notaify/node'

// Best to call init in a shared utility file, but shown here for clarity
notaify.init({
  apiKeyId: process.env.NOTAIFY_API_KEY_ID,
  apiKey: process.env.NOTAIFY_API_KEY,
})

export const GET = notaifyHandler(async (req) => {
  const users = await db.getUsers()
  return Response.json(users)
})`}
          />
        </div>

        <div className="not-prose my-6 rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-900/20">
          <div className="flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-red-600 dark:text-red-400"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-300">Important Note for Next.js</h3>
          </div>
          <p className="mt-2 text-sm text-red-800 dark:text-red-400">
            Notaify <strong>only</strong> works server-side (Node.js runtimes). Never use it in client components or leak your credentials into the browser.
          </p>
        </div>
      </div>

      <div className="space-y-4 mt-12 mb-8">
        <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">NestJS</h2>

        <p className="text-foreground">
          Integrate Notaify in a global Exception Filter to capture unhandled exceptions across the application.
        </p>

        <div className="not-prose mt-4">
          <CodeBlock
            language="typescript"
            code={`// main.ts
import notaify from '@notaify/node'

notaify.init({
  apiKeyId: process.env.NOTAIFY_API_KEY_ID,
  apiKey: process.env.NOTAIFY_API_KEY,
})

// notaify-exception.filter.ts
import { Catch, ArgumentsHost } from '@nestjs/common'
import notaify from '@notaify/node'

@Catch()
export class NotaifyExceptionFilter {
  async catch(exception: unknown, host: ArgumentsHost) {
    // Capture the error using notaify.capture
    await notaify.capture(exception as Error)
    
    // Provide standard nestjs response handling...
  }
}`}
          />
        </div>
      </div>
    </div>
  );
}
