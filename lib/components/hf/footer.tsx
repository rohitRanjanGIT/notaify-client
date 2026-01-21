import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter text-gray-900 dark:text-white">
                            <div className="relative h-8 w-8 overflow-hidden rounded-md">
                                <Image
                                    src="/notaiy_logo.png"
                                    alt="Notaifi Logo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            Notaifi
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">
                            AI-powered error monitoring and notification system for modern backend applications. Capture, analyze, and fix issues faster.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Product</h3>
                                <ul role="list" className="mt-4 space-y-3">
                                    <li>
                                        <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Features</Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Pricing</Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Integrations</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Resources</h3>
                                <ul role="list" className="mt-4 space-y-3">
                                    <li>
                                        <Link href="/docs" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Documentation</Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">API Reference</Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Blog</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Company</h3>
                                <ul role="list" className="mt-4 space-y-3">
                                    <li>
                                        <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">About</Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Carrers</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Legal</h3>
                                <ul role="list" className="mt-4 space-y-3">
                                    <li>
                                        <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Privacy</Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">Terms</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
                    <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                        &copy; {new Date().getFullYear()} Notaifi. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}