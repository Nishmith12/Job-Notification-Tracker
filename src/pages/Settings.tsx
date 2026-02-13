import React from 'react';
import { Card } from '../components/Card';

const Settings: React.FC = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="text-center py-12">
                <h1 className="text-4xl font-serif font-bold text-[var(--text-primary)] mb-4">Settings</h1>
                <p className="text-[var(--text-muted)] text-lg">This section will be built in the next step.</p>
            </div>
            <Card>
                <div className="h-64 flex items-center justify-center text-[var(--text-muted)] italic">
                    Placeholder Content
                </div>
            </Card>
        </div>
    );
};

export default Settings;
