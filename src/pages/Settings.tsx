import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Link } from 'react-router-dom';

const Settings: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center py-8">
                <h1 className="text-4xl font-serif font-bold text-[var(--text-primary)] mb-2">Configure Your Tracker</h1>
                <p className="text-[var(--text-muted)]">Tell us what you're looking for, and we'll handle the search.</p>
            </div>

            <Card title="Job Preferences" className="p-6 md:p-8">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-4">
                        <Input
                            label="Target Role Keywords"
                            placeholder="e.g. Frontend Developer, React Engineer, UI/UX Designer"
                            helperText="Separate keywords with commas."
                        />

                        <Input
                            label="Preferred Locations"
                            placeholder="e.g. San Francisco, New York, London, Remote"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-[var(--text-primary)]">Work Mode</label>
                                <select className="w-full px-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-sm)] bg-white focus:ring-2 focus:ring-[var(--accent-primary)] outline-none" defaultValue="remote">
                                    <option value="remote">Remote Only</option>
                                    <option value="hybrid">Hybrid</option>
                                    <option value="onsite">On-site</option>
                                    <option value="any">Any</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-[var(--text-primary)]">Experience Level</label>
                                <select className="w-full px-4 py-2 border border-[var(--border-color)] rounded-[var(--radius-sm)] bg-white focus:ring-2 focus:ring-[var(--accent-primary)] outline-none" defaultValue="mid">
                                    <option value="entry">Entry Level (0-2 years)</option>
                                    <option value="mid">Mid Level (3-5 years)</option>
                                    <option value="senior">Senior Level (5+ years)</option>
                                    <option value="lead">Lead / Manager</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-[var(--border-color)] flex justify-end gap-3">
                        <Button variant="secondary" type="button">Reset</Button>
                        <Link to="/dashboard">
                            <Button>Save Preferences</Button>
                        </Link>
                    </div>
                </form>
            </Card>

            <div className="text-center text-sm text-[var(--text-muted)]">
                <p>These settings control your daily digest and dashboard feed.</p>
            </div>
        </div>
    );
};

export default Settings;
