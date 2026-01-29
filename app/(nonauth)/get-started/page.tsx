export default function GetStartedPage() {
    return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-8">
                    Get Started
                </h1>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Welcome to Notaify! Follow these steps to get started with integrating Notaify into your project.
                    </p>
                    
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                        Installation
                    </h2>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
                        <code className="text-sm">npm install notaify</code>
                    </div>
                    
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                        Quick Start
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Import Notaify into your project and start using it right away.
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
                        <pre className="text-sm overflow-x-auto">
                            <code>{`import notaify from 'notaify';

// Your code here`}</code>
                        </pre>
                    </div>
                    
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                        Next Steps
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                        <li>Check out the <a href="/docs" className="text-blue-600 dark:text-blue-400 hover:underline">documentation</a> for detailed usage</li>
                        <li>Explore <a href="/features" className="text-blue-600 dark:text-blue-400 hover:underline">features</a> to see what Notaify can do</li>
                        <li>Visit our <a href="https://www.npmjs.com/package/notaify" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">NPM page</a> for more information</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
