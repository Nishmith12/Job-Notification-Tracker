import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from './Button';
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
    const { allTestsPassed } = useJobs(); // Need to access context here
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
        <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] font-body text-[var(--text-primary)]">
            {/* Top Bar */}
            <header className="h-16 border-b border-[var(--border-color)] bg-white flex items-center justify-between px-6 sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <span className="font-bold text-lg tracking-tight font-serif text-[var(--text-primary)]">
                        KodNest Job Tracker
                    </span>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors flex items-center gap-1.5 ${isActive
                                        ? 'text-[var(--accent-primary)] border-b-2 border-[var(--accent-primary)]'
                                        : 'text-[var(--text-muted)] border-b-2 border-transparent hover:text-[var(--accent-primary)]'
                                    }`
                                }
                            >
                                {item.name}
                                {item.locked && (
                                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                )}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-[var(--text-primary)]"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </header>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-[var(--border-color)] px-6 py-4 flex flex-col gap-4">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `text-base font-medium py-2 ${isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            )}

            {/* Context Header */}
            <div className="bg-[var(--bg-primary)] px-8 py-12 text-center border-b border-[var(--border-color)]">
                <div className="max-w-[var(--max-width-text)] mx-auto">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--text-primary)] mb-4 leading-tight">
                        {getPageTitle()}
                    </h1>
                    {subtitle && (
                        <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 md:p-10">
                {children}
            </main>

            {/* Proof Footer */}
            <footer className="border-t border-[var(--border-color)] bg-white p-4 sticky bottom-0 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
                <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-6 text-sm font-medium">
                        <label className="flex items-center gap-2 cursor-pointer hover:text-[var(--accent-primary)] transition-colors">
                            <input type="checkbox" className="rounded border-gray-300 text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]" />
                            UI Built
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer hover:text-[var(--accent-primary)] transition-colors">
                            <input type="checkbox" className="rounded border-gray-300 text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]" />
                            Logic Working
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer hover:text-[var(--accent-primary)] transition-colors">
                            <input type="checkbox" className="rounded border-gray-300 text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]" />
                            Test Passed
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer hover:text-[var(--accent-primary)] transition-colors">
                            <input type="checkbox" className="rounded border-gray-300 text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]" />
                            Deployed
                        </label>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--text-muted)]">Proof Required</span>
                        <Button size="sm" variant="secondary" disabled>Submit Proof</Button>
                    </div>
                </div>
            </footer>
        </div>
    );
};
