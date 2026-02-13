import React from 'react';
import type { Job } from '../types';
import { Card } from './Card';
import { Button } from './Button';
import { useJobs } from '../context/JobContext';

interface JobCardProps {
    job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
    const { saveJob, savedJobs } = useJobs();
    const isSaved = savedJobs.includes(job.id);

    return (
        <Card className="hover:border-[var(--accent-primary)] transition-colors duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl font-serif font-bold text-[var(--text-primary)]">
                        {job.company.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                            {job.title}
                        </h3>
                        <p className="text-sm text-[var(--text-muted)]">{job.company} • {job.location}</p>
                    </div>
                </div>
                {job.isNew && (
                    <span className="bg-red-50 text-[var(--accent-primary)] text-xs font-bold px-2 py-1 rounded-full">
                        NEW
                    </span>
                )}
            </div>

            <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{job.type}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{job.salary}</span>
                    {job.tags.map(tag => (
                        <span key={tag} className="text-xs border border-gray-200 px-2 py-1 rounded text-gray-500">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-[var(--text-muted)]">{job.postedAt}</span>
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => saveJob(job.id)}
                            className={isSaved ? '!bg-gray-100 !text-[var(--text-primary)]' : ''}
                        >
                            {isSaved ? 'Saved' : 'Save'}
                        </Button>
                        <Button size="sm">Apply</Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};
