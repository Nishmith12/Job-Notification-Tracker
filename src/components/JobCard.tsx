import React from 'react';
import type { Job } from '../types';
import { Card } from './Card';
import { Button } from './Button';
import { useJobs } from '../context/JobContext';

interface JobCardProps {
    job: Job;
    onView: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onView }) => {
    const { saveJob, savedJobs } = useJobs();
    const isSaved = savedJobs.includes(job.id);

    return (
        <Card className="hover:border-[var(--accent-primary)] transition-all duration-300 group hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl font-serif font-bold text-[var(--text-primary)] uppercase">
                        {job.company.substring(0, 2)}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors cursor-pointer" onClick={() => onView(job)}>
                            {job.title}
                        </h3>
                        <p className="text-sm text-[var(--text-muted)]">{job.company} • {job.location}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    {job.isNew && (
                        <span className="bg-red-50 text-[var(--accent-primary)] text-xs font-bold px-2 py-1 rounded-full">
                            NEW
                        </span>
                    )}
                    <span className="text-xs text-gray-400">{job.postedAt}</span>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 font-medium">{job.type}</span>
                    <span className="text-xs bg-blue-50 px-2 py-1 rounded text-blue-700 font-medium">{job.salary}</span>
                    <span className="text-xs bg-purple-50 px-2 py-1 rounded text-purple-700 font-medium">{job.experience} Exp</span>
                    <span className="text-xs border border-gray-200 px-2 py-1 rounded text-gray-500">{job.source}</span>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button variant="secondary" size="sm" onClick={() => onView(job)}>View Details</Button>
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={(e) => { e.stopPropagation(); saveJob(job.id); }}
                            className={isSaved ? '!bg-gray-100 !text-[var(--text-primary)]' : ''}
                        >
                            {isSaved ? 'Saved' : 'Save'}
                        </Button>
                        <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                            <Button size="sm">Apply</Button>
                        </a>
                    </div>
                </div>
                {/* Mobile fallback for opacity */}
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center md:hidden">
                    <Button variant="secondary" size="sm" onClick={() => onView(job)}>View</Button>
                    <div className="flex gap-2">
                        <Button size="sm" onClick={(e) => { e.stopPropagation(); saveJob(job.id); }}>
                            {isSaved ? 'Saved' : 'Save'}
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};
