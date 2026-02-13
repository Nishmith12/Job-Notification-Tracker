export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: 'Remote' | 'Hybrid' | 'On-site';
    salary: string;
    postedAt: string;
    description: string;
    requirements: string[];
    tags: string[];
    logoUrl?: string; // Placeholder for company logo
    isNew?: boolean;
}

export interface UserPreferences {
    roleKeywords: string[];
    locations: string[];
    workMode: 'remote' | 'hybrid' | 'onsite' | 'any';
    experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
}
