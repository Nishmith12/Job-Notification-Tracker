import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Job, UserPreferences } from '../types';
import { MockDataService } from '../services/MockDataService';

interface JobContextType {
    jobs: Job[];
    savedJobs: string[];
    preferences: UserPreferences;
    isLoading: boolean;
    loadJobs: () => Promise<void>;
    saveJob: (id: string) => void;
    updatePreferences: (prefs: Partial<UserPreferences>) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJobs = () => {
    const context = useContext(JobContext);
    if (!context) {
        throw new Error('useJobs must be used within a JobProvider');
    }
    return context;
};

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [savedJobs, setSavedJobs] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [preferences, setPreferences] = useState<UserPreferences>({
        roleKeywords: [],
        locations: [],
        workMode: 'any',
        experienceLevel: 'mid'
    });

    const loadJobs = async () => {
        setIsLoading(true);
        try {
            const data = await MockDataService.generateJobs(12, preferences);
            setJobs(data);
        } catch (error) {
            console.error("Failed to load jobs", error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveJob = (id: string) => {
        setSavedJobs(prev =>
            prev.includes(id) ? prev.filter(jobId => jobId !== id) : [...prev, id]
        );
    };

    const updatePreferences = (newPrefs: Partial<UserPreferences>) => {
        setPreferences(prev => ({ ...prev, ...newPrefs }));
    };

    return (
        <JobContext.Provider value={{
            jobs,
            savedJobs,
            preferences,
            isLoading,
            loadJobs,
            saveJob,
            updatePreferences
        }}>
            {children}
        </JobContext.Provider>
    );
};
