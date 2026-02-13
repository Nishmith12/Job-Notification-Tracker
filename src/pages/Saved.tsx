import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { JobCard } from '../components/JobCard';
import { JobDetailModal } from '../components/JobDetailModal';
import type { Job } from '../types';

const Saved: React.FC = () => {
    const { jobs, savedJobs, saveJob } = useJobs();
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter jobs to only show saved ones
    // Note: In a real app, we might need to fetch specific IDs if they aren't in the loaded 'jobs' array.
    // For this mock, we assume 'jobs' contains the universe of jobs or at least the ones we saved from the dashboard.
    // If 'jobs' is empty (user refreshed and lost non-persistent mock data but kept persistent IDs), we might have an issue.
    // For this prototype, we'll assume the user loads data first.
    const savedJobObjects = jobs.filter(job => savedJobs.includes(job.id));

    const handleViewJob = (job: Job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedJob(null), 300);
    };

    return (
        <div className="flex flex-col gap-8 animate-fade-in">
            <div className="text-center py-8">
                <h1 className="text-4xl font-serif font-bold text-[var(--text-primary)] mb-2">Saved Jobs</h1>
                <p className="text-[var(--text-muted)] text-lg">
                    {savedJobObjects.length > 0
                        ? `You have saved ${savedJobObjects.length} jobs.`
                        : 'Curate your top opportunities.'}
                </p>
            </div>

            {savedJobs.length === 0 ? (
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
            ) : (
                <>
                    {savedJobObjects.length === 0 && savedJobs.length > 0 && (
                        <div className="text-center p-4 bg-yellow-50 text-yellow-800 rounded mb-4">
                            Note: Some saved jobs might not be visible if the mock dataset has been reset.
                            <br />
                            <Button size="sm" className="mt-2" onClick={() => window.location.href = '/dashboard'}>Reload Dataset</Button>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedJobObjects.map(job => (
                            <JobCard key={job.id} job={job} onView={handleViewJob} />
                        ))}
                    </div>
                </>
            )}

            {selectedJob && (
                <JobDetailModal
                    job={selectedJob}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={saveJob}
                    isSaved={true}
                />
            )}
        </div>
    );
};

export default Saved;
