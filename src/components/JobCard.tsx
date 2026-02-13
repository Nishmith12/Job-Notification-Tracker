import React from 'react';
import type { Job, JobStatus } from '../types';
import { Card } from './Card';
import { Button } from './Button';
import { useJobs } from '../context/JobContext';

interface JobCardProps {
    job: Job;
    onView?: (job: Job) => void;
    onClick?: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onView, onClick }) => {
    const { saveJob, removeJob, isSaved, updateJobStatus } = useJobs();
    const saved = isSaved(job.id);

    const getMatchColor = (score?: number) => {
        if (!score) return 'bg-gray-100 text-gray-600';
        if (score >= 80) return 'bg-green-100 text-green-800';
        if (score >= 60) return 'bg-amber-100 text-amber-800';
        if (score >= 40) return 'bg-gray-100 text-gray-800';
        return 'bg-gray-100 text-gray-400';
    };

    const getStatusColor = (status?: JobStatus) => {
        switch (status) {
            case 'Applied': return 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500';
            case 'Rejected': return 'bg-red-50 text-red-700 border-red-200 ring-red-500';
            case 'Selected': return 'bg-green-50 text-green-700 border-green-200 ring-green-500';
            default: return 'bg-gray-50 text-gray-600 border-gray-200 ring-gray-400';
        }
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.stopPropagation();
        const newStatus = e.target.value as JobStatus;
        updateJobStatus(job.id, newStatus);
    };

    const handleSave = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (saved) {
            removeJob(job.id);
        } else {
            saveJob(job);
        }
    };

    const handleCardClick = () => {
        if (onClick) onClick();
        if (onView) onView(job);
    };

    return (
        <Card onClick={handleCardClick} className="hover:border-[var(--accent-primary)] transition-all duration-300 group hover:shadow-md relative overflow-hidden cursor-pointer">
            {/* Header: Score and Status */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-4">
                    {job.logoUrl ? (
                        <img src={job.logoUrl} alt={job.company} className="w-12 h-12 rounded-lg object-contain bg-gray-50 border border-gray-100" />
                    ) : (
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
                            {job.company.charAt(0)}
                        </div>
                    )}
                    <div>
                        <h3 className="font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors line-clamp-1">{job.title}</h3>
                        <p className="text-sm font-medium text-[var(--text-secondary)]">{job.company}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-1">{job.location} • {job.type}</p>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                    {/* Match Score */}
                    {job.matchScore !== undefined && (
                        <span className={`text-xs font-bold px-2 py-1 rounded-full border border-transparent ${getMatchColor(job.matchScore)}`}>
                            {job.matchScore}% Match
                        </span>
                    )}

                    {/* Status Selector */}
                    <div onClick={(e) => e.stopPropagation()} className="relative">
                        <select
                            value={job.status || 'Not Applied'}
                            onChange={handleStatusChange}
                            className={`appearance-none cursor-pointer text-[10px] items-center font-bold uppercase tracking-wider px-2 py-1 rounded border transition-colors focus:outline-none focus:ring-1 ${getStatusColor(job.status)}`}
                        >
                            <option value="Not Applied">Not Applied</option>
                            <option value="Applied">Applied</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Selected">Selected</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 rounded bg-gray-100 text-xs font-medium text-gray-600 border border-gray-200">
                    {job.experience}
                </span>
                {job.skills.slice(0, 2).map((skill, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-blue-50 text-xs font-medium text-blue-600 border border-blue-100">
                        {skill}
                    </span>
                ))}
            </div>

            {/* Footer Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-2">
                <span className="text-xs text-[var(--text-muted)] font-medium">
                    Posted {job.postedDaysAgo}d ago
                </span>
                <div className="flex gap-2">
                    <Button variant="text" size="sm" onClick={handleSave} className={saved ? "text-[var(--accent-primary)] bg-blue-50" : "text-gray-400 hover:text-gray-600"}>
                        <svg className="w-5 h-5" fill={saved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </Button>
                    <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); if (onView) onView(job); }}>
                        Details
                    </Button>
                </div>
            </div>
        </Card>
    );
};
