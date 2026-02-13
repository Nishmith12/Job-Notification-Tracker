import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Job, UserPreferences } from '../types';
import { MockDataService } from '../services/MockDataService';
import { ScoringService } from '../services/ScoringService';

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
    const [savedJobs, setSavedJobs] = useState<string[]>(() => {
        const saved = localStorage.getItem('kodnest_saved_jobs');
        return saved ? JSON.parse(saved) : [];
    });
    const [isLoading, setIsLoading] = useState(false);

    // Initialize preferences from localStorage or default
    const [preferences, setPreferences] = useState<UserPreferences>(() => {
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        return savedPrefs ? JSON.parse(savedPrefs) : {
            roleKeywords: [],
            locations: [],
            workMode: [], // Default empty array
            experienceLevel: 'Fresher', // Default
            skills: [],
            minMatchScore: 40
        };
    });

    // Persist saved jobs
    useEffect(() => {
        localStorage.setItem('kodnest_saved_jobs', JSON.stringify(savedJobs));
    }, [savedJobs]);

    // Persist preferences
    useEffect(() => {
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(preferences));
    }, [preferences]);

    const loadJobs = async () => {
        setIsLoading(true);
        try {
            const data = await MockDataService.generateJobs(60, preferences);
            // Calculate scores immediately upon loading
            const scoredData = data.map(job => ({
                ...job,
                matchScore: ScoringService.calculateMatchScore(job, preferences)
            }));
            setJobs(scoredData);
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
        setPreferences(prev => {
            const updated = { ...prev, ...newPrefs };
            // Re-score jobs immediately with new preferences
            setJobs(currentJobs => currentJobs.map(job => ({
                ...job,
                matchScore: ScoringService.calculateMatchScore(job, updated)
            })));
            return updated;
        });
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
