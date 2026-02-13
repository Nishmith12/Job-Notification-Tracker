import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

const Digest: React.FC = () => {
    return (
        <div className="flex flex-col gap-8 animate-fade-in">
            <div className="text-center py-12">
                <h1 className="text-4xl font-serif font-bold text-[var(--text-primary)] mb-4">Daily Digest</h1>
                <p className="text-[var(--text-muted)] text-lg">Your morning briefing at 9:00 AM.</p>
            </div>

            <Card className="py-24 text-center border-dashed bg-gray-50/50">
                <div className="max-w-md mx-auto space-y-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-[var(--accent-primary)] opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">Your daily digest will arrive at 9AM</h3>
                    <p className="text-[var(--text-muted)] leading-relaxed">
                        We scan thousands of listings to find the few that match your preferences perfectly.
                    </p>
                    <div className="pt-2">
                        <Link to="/settings">
                            <Button variant="secondary">Adjust Preferences</Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Digest;
