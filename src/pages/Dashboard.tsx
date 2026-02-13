import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useJobs } from '../context/JobContext';
import { JobCard } from '../components/JobCard';
import { FilterBar } from '../components/FilterBar';
import { JobDetailModal } from '../components/JobDetailModal';
import type { Job } from '../types';

const Dashboard: React.FC = () => {
    const { jobs, isLoading, loadJobs, savedJobs, saveJob, preferences } = useJobs();
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [modeFilter, setModeFilter] = useState('');
    const [experienceFilter, setExperienceFilter] = useState('');
    const [sourceFilter, setSourceFilter] = useState('');
    const [sortOption, setSortOption] = useState('match'); // Default to match score
    const [showMatchesOnly, setShowMatchesOnly] = useState(false);

    const handleViewJob = (job: Job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedJob(null), 300); // Clear after animation
    };

    // Filter Logic
    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesLocation = locationFilter ? job.location.includes(locationFilter) : true;
        const matchesMode = modeFilter ? job.type === modeFilter : true;
        const matchesExperience = experienceFilter ? job.experience === experienceFilter : true;
        const matchesSource = sourceFilter ? job.source === sourceFilter : true;

        // Match Score Filter
        const matchesScore = showMatchesOnly ? (job.matchScore || 0) >= preferences.minMatchScore : true;

        return matchesSearch && matchesLocation && matchesMode && matchesExperience && matchesSource && matchesScore;
    });

    const sortedJobs = [...filteredJobs].sort((a, b) => {
        if (sortOption === 'salary') {
            // Rough heuristic for salary sorting (parsing strings like "₹15k" or "₹3-5 LPA")
            return b.salary.localeCompare(a.salary);
        }
        if (sortOption === 'match') {
            return (b.matchScore || 0) - (a.matchScore || 0); // Descending match score
        }
        // Default to latest
        return a.postedDaysAgo - b.postedDaysAgo;
    });

    return (
        <div className="flex flex-col gap-6 animate-fade-in relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-[var(--text-primary)]">Dashboard</h1>
                    <p className="text-[var(--text-muted)] mt-1">
                        {jobs.length > 0
                            ? `Found ${sortedJobs.length} opportunities.`
                            : 'Your daily job tracking overview.'}
                    </p>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                    {jobs.length > 0 && (
                        <>
                            <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 border border-gray-200 rounded-[var(--radius-sm)] hover:border-[var(--accent-primary)] transition-colors">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-[var(--accent-primary)] rounded focus:ring-[var(--accent-primary)]"
                                    checked={showMatchesOnly}
                                    onChange={(e) => setShowMatchesOnly(e.target.checked)}
                                />
                                <span className="text-sm font-medium text-gray-700">Matches &gt; {preferences.minMatchScore}%</span>
                            </label>

                            <Button variant="secondary" size="sm" onClick={loadJobs} disabled={isLoading}>
                                {isLoading ? 'Refreshing...' : 'Refresh Feed'}
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* Missing Preferences Banner */}
            {jobs.length > 0 && preferences.roleKeywords.length === 0 && (
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="text-sm text-blue-800">Set your preferences to activate intelligent match scoring.</p>
                    </div>
                    <Button size="sm" onClick={() => window.location.href = '/settings'}>Configure</Button>
                </div>
            )}

            {jobs.length > 0 && (
                <FilterBar
                    onSearch={setSearchQuery}
                    onLocationChange={setLocationFilter}
                    onModeChange={setModeFilter}
                    onExperienceChange={setExperienceFilter}
                    onSourceChange={setSourceFilter}
                    onSortChange={setSortOption}
                />
            )}

            {jobs.length === 0 ? (
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
                            <Button onClick={loadJobs} disabled={isLoading}>
                                {isLoading ? 'Loading Dataset...' : 'Load Realistic Dataset'}
                            </Button>
                        </div>
                    </div>
                </Card>
            ) : sortedJobs.length === 0 ? (
                <div className="text-center py-20">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">No jobs match your criteria</h3>
                    <p className="text-[var(--text-muted)]">
                        {showMatchesOnly
                            ? `Try lowering your minimum match score (currently ${preferences.minMatchScore}%) or adjusting filters.`
                            : "Try adjusting your search or filters to find what you're looking for."}
                    </p>
                    <Button variant="secondary" className="mt-4" onClick={() => {
                        setSearchQuery('');
                        setLocationFilter('');
                        setModeFilter('');
                        setExperienceFilter('');
                        setSourceFilter('');
                        setShowMatchesOnly(false);
                    }}>Clear All Filters</Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedJobs.map(job => (
                        <JobCard key={job.id} job={job} onView={handleViewJob} />
                    ))}
                </div>
            )}

            {selectedJob && (
                <JobDetailModal
                    job={selectedJob}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={saveJob}
                    isSaved={savedJobs.includes(selectedJob.id)}
                />
            )}
        </div>
    );
};

export default Dashboard;
