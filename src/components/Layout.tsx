import React from 'react';
import { Button } from './Button';

interface LayoutProps {
    children: React.ReactNode;
    projectName?: string;
    stepCurrent?: number;
    stepTotal?: number;
    status?: 'Not Started' | 'In Progress' | 'Shipped';
    title?: string;
    subtitle?: string;
}

export const Layout: React.FC<LayoutProps> = ({
    children,
    projectName = 'KodNest Job Tracker',
    stepCurrent = 1,
    stepTotal = 5,
    status = 'In Progress',
    title = 'Design System Demo',
    subtitle = 'Reviewing the core components and layout structure.',
}) => {
    return (
        <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] font-body text-[var(--text-primary)]">
            {/* Top Bar */}
            <header className="h-16 border-b border-[var(--border-color)] bg-white flex items-center justify-between px-6 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <span className="font-bold text-lg tracking-tight">{projectName}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                    <span>Step {stepCurrent} of {stepTotal}</span>
                    <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[var(--accent-primary)] transition-all duration-300"
                            style={{ width: `${(stepCurrent / stepTotal) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${status === 'Shipped' ? 'bg-green-100 text-green-700 border-green-200' :
                        status === 'In Progress' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                            'bg-gray-100 text-gray-700 border-gray-200'
                        }`}>
                        {status}
                    </span>
                </div>
            </header>

            {/* Context Header */}
            <div className="bg-[var(--bg-primary)] px-8 py-12 text-center border-b border-[var(--border-color)]">
                <div className="max-w-[var(--max-width-text)] mx-auto">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--text-primary)] mb-4 leading-tight">
                        {title}
                    </h1>
                    <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                        {subtitle}
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col md:flex-row w-full max-w-[1400px] mx-auto p-6 md:p-10 gap-10">
                {/* Primary Workspace (70%) */}
                <section className="flex-1 w-full md:w-[70%]">
                    {/* This is where the main content goes */}
                    {children}
                </section>

                {/* Secondary Panel (30%) */}
                <aside className="w-full md:w-[30%] space-y-6">
                    {/* Example Sidebar Content */}
                    <div className="bg-white p-6 rounded-[var(--radius-md)] border border-[var(--border-color)]">
                        <h3 className="font-serif text-lg font-bold mb-2">Step Explanation</h3>
                        <p className="text-sm text-[var(--text-muted)] mb-4">
                            This panel provides context and helper actions for the current step.
                        </p>

                        <div className="bg-gray-50 p-3 rounded-[var(--radius-sm)] mb-4 border border-gray-100 font-mono text-xs text-gray-600 break-all">
                            cp -r src/components/Layout.tsx .
                        </div>

                        <div className="flex flex-col gap-2">
                            <Button variant="secondary" size="sm" className="w-full justify-center">Copy Command</Button>
                            <Button variant="primary" size="sm" className="w-full justify-center">Build in Lovable</Button>
                        </div>
                    </div>
                </aside>
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
