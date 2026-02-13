import React from 'react';
import { Card } from './Card';

interface FilterBarProps {
    onSearch: (query: string) => void;
    onLocationChange: (location: string) => void;
    onModeChange: (mode: string) => void;
    onExperienceChange: (exp: string) => void;
    onSourceChange: (source: string) => void;
    onSortChange: (sort: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
    onSearch,
    onLocationChange,
    onModeChange,
    onExperienceChange,
    onSourceChange,
    onSortChange,
}) => {
    return (
        <Card className="p-4 mb-6 sticky top-20 z-30 shadow-sm border border-[var(--border-color)]">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <svg className="w-5 h-5 absolute left-3 top-3 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search roles, companies, skills..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-[var(--radius-sm)] focus:ring-2 focus:ring-[var(--accent-primary)] outline-none"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    <select className="px-3 py-2 bg-white border border-gray-200 rounded-[var(--radius-sm)] text-sm outline-none cursor-pointer hover:border-gray-300" onChange={(e) => onLocationChange(e.target.value)}>
                        <option value="">Location</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Pune">Pune</option>
                        <option value="Delhi">Delhi NCR</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Remote">Remote</option>
                    </select>

                    <select className="px-3 py-2 bg-white border border-gray-200 rounded-[var(--radius-sm)] text-sm outline-none cursor-pointer hover:border-gray-300" onChange={(e) => onModeChange(e.target.value)}>
                        <option value="">Work Mode</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="On-site">On-site</option>
                    </select>

                    <select className="px-3 py-2 bg-white border border-gray-200 rounded-[var(--radius-sm)] text-sm outline-none cursor-pointer hover:border-gray-300" onChange={(e) => onExperienceChange(e.target.value)}>
                        <option value="">Experience</option>
                        <option value="Fresher">Fresher</option>
                        <option value="0-1">0-1 Years</option>
                        <option value="1-3">1-3 Years</option>
                        <option value="3-5">3-5 Years</option>
                        <option value="5+">5+ Years</option>
                    </select>

                    <select className="px-3 py-2 bg-white border border-gray-200 rounded-[var(--radius-sm)] text-sm outline-none cursor-pointer hover:border-gray-300" onChange={(e) => onSourceChange(e.target.value)}>
                        <option value="">Source</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Naukri">Naukri</option>
                        <option value="Indeed">Indeed</option>
                    </select>

                    <select className="px-3 py-2 bg-white border border-gray-200 rounded-[var(--radius-sm)] text-sm outline-none cursor-pointer hover:border-gray-300" onChange={(e) => onSortChange(e.target.value)}>
                        <option value="latest">Sort: Latest</option>
                        <option value="salary">Sort: Salary</option>
                    </select>
                </div>
            </div>
        </Card>
    );
};
