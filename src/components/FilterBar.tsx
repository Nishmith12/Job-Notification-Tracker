import React from 'react';

interface FilterBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    sortOption: string;
    onSortChange: (option: string) => void;
    statusFilter: string;
    onStatusFilterChange: (status: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
    searchQuery,
    onSearchChange,
    sortOption,
    onSortChange,
    statusFilter,
    onStatusFilterChange
}) => {
    return (
        <div className="bg-white p-4 rounded-xl border border-[var(--border-color)] shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between animate-fade-in relative z-20">
            {/* Search */}
            <div className="relative w-full md:w-96">
                <input
                    type="text"
                    placeholder="Search jobs by title, company, or skills..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>

            {/* Filters & Sort */}
            <div className="flex w-full md:w-auto gap-3">

                {/* Status Filter */}
                <div className="relative flex-1 md:flex-none">
                    <select
                        className="w-full md:w-40 appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] cursor-pointer hover:bg-gray-100 transition-colors"
                        value={statusFilter}
                        onChange={(e) => onStatusFilterChange(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Not Applied">Not Applied</option>
                        <option value="Applied">Applied</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Selected">Selected</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>

                {/* Sort */}
                <div className="relative flex-1 md:flex-none">
                    <select
                        className="w-full md:w-auto appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] cursor-pointer hover:bg-gray-100 transition-colors"
                        value={sortOption}
                        onChange={(e) => onSortChange(e.target.value)}
                    >
                        <option value="Latest">Sort: Latest</option>
                        <option value="Match Score">Sort: Match Score</option>
                        <option value="Salary">Sort: Salary</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                </div>
            </div>
        </div>
    );
};
