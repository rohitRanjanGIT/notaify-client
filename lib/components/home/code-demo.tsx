
export default function CodeDemo() {
    return (
        <section className="py-24 bg-white dark:bg-black overflow-hidden relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Integration? It's just two steps.
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                            We know you hate complex setups. Notaifi is designed to be plug-and-play. Just add our middleware and wrap your routes.
                        </p>
                        <div className="mt-8 space-y-4">
                            <div className="flex items-start">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 font-bold">1</div>
                                <p className="ml-4 text-base text-gray-700 dark:text-gray-300 pt-1">Initialize the <code className="bg-gray-100 px-1 py-0.5 rounded text-sm dark:bg-gray-800">notaifiMiddleware</code></p>
                            </div>
                            <div className="flex items-start">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400 font-bold">2</div>
                                <p className="ml-4 text-base text-gray-700 dark:text-gray-300 pt-1">Wrap routes with <code className="bg-gray-100 px-1 py-0.5 rounded text-sm dark:bg-gray-800">asyncHandler</code></p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className="rounded-xl bg-gray-900 shadow-2xl overflow-hidden border border-gray-800">
                            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-800">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="text-xs text-gray-400 font-mono ml-2">app.js</div>
                            </div>
                            <div className="p-4 overflow-x-auto">
                                <pre className="text-sm font-mono text-gray-300 leading-relaxed">
                                    {`import express from "express";
import { notaifiMiddleware, asyncHandler } from "notaifi";

const app = express();

// 1. Initialize Middleware
app.use(notaifiMiddleware({
  project: "my-backend",
  environment: "production",
}));

// 2. Wrap Routes
app.get("/user", asyncHandler(async (req, res) => {
  const user = await db.findUser(req.query.id);
  res.json(user);
}));

app.listen(3000);`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 -z-10 opacity-20 hidden lg:block">
                <div className="w-[600px] h-[600px] bg-blue-500/20 blur-3xl rounded-full"></div>
            </div>
        </section>
    );
}
