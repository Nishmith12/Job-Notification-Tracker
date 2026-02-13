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
        if (score >= 80) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        if (score >= 60) return 'bg-amber-50 text-amber-700 border-amber-200';
        if (score >= 40) return 'bg-orange-50 text-orange-700 border-orange-200';
        return 'bg-gray-50 text-gray-500 border-gray-200';
    };

    const getStatusColor = (status?: JobStatus) => {
        switch (status) {
            case 'Applied': return 'bg-blue-600 text-white shadow-md shadow-blue-200';
            case 'Rejected': return 'bg-red-500 text-white shadow-md shadow-red-200';
            case 'Selected': return 'bg-green-600 text-white shadow-md shadow-green-200';
            default: return 'bg-gray-100 text-gray-600 hover:bg-gray-200';
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
        <Card onClick={handleCardClick} className="group relative overflow-hidden cursor-pointer border border-transparent hover:border-[var(--border-hover)] hover:shadow-lg transition-all duration-300 bg-white">
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-4">
                        {job.logoUrl ? (
                            <img src={job.logoUrl} alt={job.company} className="w-14 h-14 rounded-xl object-contain bg-white border border-gray-100 shadow-sm" />
                        ) : (
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-2xl shadow-indigo-100 shadow-lg">
                                {job.company.charAt(0)}
                            </div>
                        )}
                        <div>
                            <h3 className="font-heading font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors line-clamp-1 leading-tight">
                                {job.title}
                            </h3>
                            <p className="text-sm font-medium text-[var(--text-muted)] mt-1">{job.company}</p>
                        </div>
                    </div>

                    {/* Score Badge */}
                    {job.matchScore !== undefined && (
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getMatchColor(job.matchScore)} flex items-center gap-1`}>
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            {job.matchScore}%
                        </span>
                    )}
                </div>

                {/* Info Row */}
                <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)] font-medium mb-4">
                    <span className="flex items-center gap-1.5 bg-[var(--bg-tertiary)] px-2.5 py-1 rounded-md">
                        <svg className="w-3.5 h-3.5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 bg-[var(--bg-tertiary)] px-2.5 py-1 rounded-md">
                        <svg className="w-3.5 h-3.5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        {job.type}
                    </span>
                    <span className="flex items-center gap-1.5 bg-[var(--bg-tertiary)] px-2.5 py-1 rounded-md">
                        <svg className="w-3.5 h-3.5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {job.postedDaysAgo}d ago
                    </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6 h-6 overflow-hidden">
                    {job.skills.map((skill, i) => (
                        <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]">
                    <div onClick={(e) => e.stopPropagation()} className="relative group/status">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-bold leading-none cursor-pointer ${getStatusColor(job.status)}`}>
                            <span>{job.status || 'Set Status'}</span>
                            <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                        <select
                            value={job.status || 'Not Applied'}
                            onChange={handleStatusChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        >
                            <option value="Not Applied">Not Applied</option>
                            <option value="Applied">Applied</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Selected">Selected</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-full transition-colors cursor-pointer ${saved ? 'bg-pink-50 text-pink-600' : 'hover:bg-gray-100 text-[var(--text-muted)]'}`} onClick={handleSave}>
                            <svg className="w-5 h-5" fill={saved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); if (onView) onView(job); }}>
                            View Details
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};
