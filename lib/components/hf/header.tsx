"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, ExternalLink, Github } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Docs", href: "/docs" },
    { name: "NPM", href: "https://www.npmjs.com/package/notaify", external: true },
    { name: "Dashboard", href: "/dashboard" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/70 backdrop-blur-xl dark:border-gray-800/50 dark:bg-black/70 transition-all duration-300">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex shrink-0 items-center">
                    <Link href="/" className="flex items-center gap-2.5 group transition-all">
                        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 p-1 dark:from-indigo-500/10 dark:to-purple-500/10 border border-indigo-500/10 dark:border-indigo-400/10">
                            <div className="relative h-full w-full">
                                <Image
                                    src="/notaify_logo.png"
                                    alt="Notaify Logo"
                                    fill
                                    className="object-contain transition-transform group-hover:scale-110 duration-500"
                                    priority
                                />
                            </div>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            Notaify
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 flex items-center gap-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-all"
                        >
                            {item.name}
                            {item.external && <ExternalLink className="h-3 w-3 opacity-50" />}
                        </Link>
                    ))}
                </nav>

                {/* Right Side Actions */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="hidden sm:flex items-center gap-2 border-r pr-4 border-gray-200 dark:border-gray-800 mr-2">
                        <ThemeToggle />
                    </div>

                    <SignedOut>
                        <div className="hidden sm:flex items-center gap-3">
                            <Link
                                href="/login"
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors px-2"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="inline-flex h-10 items-center justify-center rounded-full bg-black px-6 py-2 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] transition-all hover:bg-gray-800 hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] active:scale-95 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </SignedOut>

                    <SignedIn>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "h-9 w-9 border border-gray-200 dark:border-gray-800"
                                }
                            }}
                        />
                    </SignedIn>

                    {/* Mobile Menu Trigger */}
                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 border-l border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-black/95 backdrop-blur-xl">
                                <SheetHeader className="p-6 border-b border-gray-100 dark:border-gray-900">
                                    <SheetTitle className="flex items-center gap-2 text-xl font-bold tracking-tight">
                                        <div className="relative h-8 w-8 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                                            <Image src="/notaify_logo.png" alt="Logo" fill className="object-contain p-1" />
                                        </div>
                                        Notaify
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-1 p-4">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            target={item.external ? "_blank" : undefined}
                                            rel={item.external ? "noopener noreferrer" : undefined}
                                            className="flex items-center justify-between px-4 py-4 rounded-2xl text-lg font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-800"
                                        >
                                            {item.name}
                                            {item.external ? <ExternalLink className="h-4 w-4 opacity-50" /> : <div className="h-2 w-2 rounded-full bg-indigo-500/20" />}
                                        </Link>
                                    ))}
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 dark:border-gray-900 bg-white/50 dark:bg-black/50 backdrop-blur-sm space-y-4">
                                    <SignedOut>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Button variant="outline" asChild className="rounded-xl h-12">
                                                <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
                                            </Button>
                                            <Button asChild className="rounded-xl h-12 bg-black text-white dark:bg-white dark:text-black hover:opacity-90 shadow-lg">
                                                <Link href="/register" onClick={() => setIsOpen(false)}>Sign Up</Link>
                                            </Button>
                                        </div>
                                    </SignedOut>
                                    <div className="flex items-center justify-between px-2 text-gray-500">
                                        <Link href="https://github.com" target="_blank" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors">
                                            <Github className="h-5 w-5" />
                                        </Link>
                                        <p className="text-xs font-medium">© {new Date().getFullYear()} Notaify</p>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
