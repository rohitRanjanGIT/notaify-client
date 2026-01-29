import Image from "next/image";
import Link from "next/link";

// I will just use standard HTML/Tailwind for now to be safe and avoid errors.


export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-black/80">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex shrink-0 items-center">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter text-gray-900 dark:text-white">
                        <div className="relative h-10 w-20  overflow-hidden rounded-md">
                            <Image
                                src="/notaiy_logo.png"
                                alt="Notaifi Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                        Home
                    </Link>
                    <Link href="/get-started" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                        Get Started
                    </Link>
                    <Link href="/features" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                        Features
                    </Link>
                    <Link href="/docs" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                        Docs
                    </Link>
                    <Link href="https://www.npmjs.com/package/notaify" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                        NPM
                    </Link>
                </nav>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 hidden sm:block"
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="inline-flex h-9 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </header>
    );
}