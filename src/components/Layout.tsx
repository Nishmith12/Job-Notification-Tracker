import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useJobs } from '../context/JobContext';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
}

export const Layout: React.FC<LayoutProps> = ({
    children,
    title,
    subtitle,
}) => {
    const { allTestsPassed } = useJobs();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Saved', path: '/saved' },
        { name: 'Digest', path: '/digest' },
        { name: 'Settings', path: '/settings' },
        { name: 'Proof', path: '/jt/proof' },
        { name: 'Test', path: '/jt/07-test' },
        { name: 'Ship', path: '/jt/08-ship', locked: !allTestsPassed },
    ];

    const getPageTitle = () => {
        if (title) return title;
        const currentPath = location.pathname;
        const route = navigation.find(n => n.path === currentPath);
        return route ? route.name : 'KodNest Job Tracker';
    };

    return (
        <div className="flex flex-col min-h-screen bg-[var(--bg-secondary)] font-body text-[var(--text-primary)] antialiased transition-colors duration-300">
            {/* Glassmorphism Header */}
            <header className="h-16 border-b border-[var(--border-color)] bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
                <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-10">
                        {/* Logo Area */}
                        <div className="flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 rounded-lg bg-[var(--accent-gradient)] shadow-[var(--accent-glow)] flex items-center justify-center text-white font-bold text-lg">
                                K
                            </div>
                            <span className="font-heading font-bold text-lg tracking-tight text-[var(--text-primary)]">
                                KodNest
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1 bg-[var(--bg-tertiary)] p-1 rounded-lg border border-[var(--border-color)]">
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${isActive
                                            ? 'bg-white text-[var(--text-primary)] shadow-sm'
                                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5'
                                        }`
                                    }
                                >
                                    {item.name}
                                    {item.locked && (
                                        <svg className="w-3 h-3 text-gray-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    )}
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-3 py-1.5 rounded-full border border-[var(--border-color)]">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            v1.0.0
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-[var(--text-primary)] hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-[var(--border-color)] px-6 py-4 flex flex-col gap-2 absolute w-full z-40 animate-fade-in shadow-lg">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `text-base font-medium px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]'
                                    : 'text-[var(--text-muted)] hover:bg-gray-50'
                                }`
                            }
                        >
                            <div className="flex items-center justify-between w-full">
                                {item.name}
                                {item.locked && (
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                )}
                            </div>
                        </NavLink>
                    ))}
                </div>
            )}

            {/* Context Header (Dynamic) */}
            <div className="bg-white border-b border-[var(--border-color)] px-6 py-12 md:py-16">
                <div className="max-w-[1200px] mx-auto animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-[var(--accent-primary)] mb-4 tracking-tight leading-[1.1]">
                        {getPageTitle()}
                        <span className="text-[var(--accent-secondary)] opacity-40">.</span>
                    </h1>
                    {subtitle && (
                        <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl font-light">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-[1200px] mx-auto p-6 md:p-8 space-y-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-[var(--border-color)] bg-white py-8 mt-12">
                <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-[var(--text-muted)] gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-[var(--accent-gradient)] flex items-center justify-center text-white text-xs font-bold">K</div>
                        <span className="font-semibold text-[var(--text-primary)]">KodNest Inc.</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};
