import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

const Landing: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-8 animate-fade-in">
            <div className="max-w-2xl space-y-6">
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-[var(--text-primary)] leading-tight">
                    Stop Missing The Right Jobs.
                </h1>
                <p className="text-xl text-[var(--text-muted)] leading-relaxed">
                    Precision-matched job discovery delivered daily at 9AM.
                </p>
                <div className="pt-4">
                    <Link to="/settings">
                        <Button size="lg" className="px-8 text-lg">
                            Start Tracking
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="mt-16 w-full max-w-4xl opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                <Card className="bg-gray-50 border-dashed">
                    <div className="h-64 flex items-center justify-center text-[var(--text-muted)] italic">
                        App Preview / Dashboard Skeleton
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Landing;
