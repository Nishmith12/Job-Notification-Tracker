import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col gap-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-[var(--text-primary)]">Dashboard</h1>
                    <p className="text-[var(--text-muted)] mt-1">Your daily job tracking overview.</p>
                </div>
                <Link to="/settings">
                    <Button variant="secondary" size="sm">Manage Preferences</Button>
                </Link>
            </div>

            <Card className="py-20 text-center border-dashed bg-gray-50/50">
                <div className="max-w-md mx-auto space-y-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">No jobs yet</h3>
                    <p className="text-[var(--text-muted)] leading-relaxed">
                        In the next step, you will load a realistic dataset based on your preferences.
                        Configure your settings to get started.
                    </p>
                    <div className="pt-2">
                        <Link to="/settings">
                            <Button>Configure Tracker</Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Dashboard;
