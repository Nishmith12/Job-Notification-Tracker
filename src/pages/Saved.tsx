import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

const Saved: React.FC = () => {
    return (
        <div className="flex flex-col gap-8 animate-fade-in">
            <div className="text-center py-12">
                <h1 className="text-4xl font-serif font-bold text-[var(--text-primary)] mb-4">Saved Jobs</h1>
                <p className="text-[var(--text-muted)] text-lg">Curate your top opportunities.</p>
            </div>

            <Card className="py-24 text-center border-dashed bg-gray-50/50">
                <div className="max-w-md mx-auto space-y-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-[var(--accent-primary)] opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">Your saved jobs will appear here</h3>
                    <p className="text-[var(--text-muted)] leading-relaxed">
                        Flag interesting roles from your dashboard to review them later.
                    </p>
                    <div className="pt-2">
                        <Link to="/dashboard">
                            <Button variant="secondary">Browse Dashboard</Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Saved;
