export default function FeaturesPage() {
    const features = [
        {
            title: "Easy Integration",
            description: "Seamlessly integrate Notaify into your existing projects with minimal setup required.",
            icon: "⚡"
        },
        {
            title: "Lightweight",
            description: "Minimal bundle size ensures your application stays fast and responsive.",
            icon: "🪶"
        },
        {
            title: "Type Safe",
            description: "Built with TypeScript for a superior developer experience with full type support.",
            icon: "🛡️"
        },
        {
            title: "Customizable",
            description: "Flexible configuration options to match your project's specific needs.",
            icon: "🎨"
        },
        {
            title: "Well Documented",
            description: "Comprehensive documentation and examples to get you started quickly.",
            icon: "📚"
        },
        {
            title: "Active Development",
            description: "Regular updates and improvements to keep up with modern development practices.",
            icon: "🚀"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
                        Features
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Discover what makes Notaify the perfect choice for your notification needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a 
                        href="/get-started"
                        className="inline-flex h-12 items-center justify-center rounded-md bg-black px-8 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    >
                        Get Started Now
                    </a>
                </div>
            </div>
        </div>
    );
}
