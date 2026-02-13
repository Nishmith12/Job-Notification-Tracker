import type { Job, UserPreferences } from '../types';

const TITLES = [
    'Frontend Developer', 'React Engineer', 'UI/UX Designer', 'Full Stack Developer',
    'Product Designer', 'Software Engineer', 'Senior Frontend Engineer', 'UX Researcher'
];

const COMPANIES = [
    'TechFlow', 'Creativ', 'BuildStream', 'DevScale', 'PixelPerfect', 'DataMind', 'CloudSync', 'StartUp Inc'
];

const LOCATIONS = [
    'San Francisco, CA', 'New York, NY', 'Austin, TX', 'London, UK', 'Berlin, DE', 'Toronto, CA', 'Remote'
];

const REQUIREMENTS = [
    '3+ years of experience with React and TypeScript',
    'Strong understanding of modern CSS and UI principles',
    'Experience with state management (Redux, Context, Zustand)',
    'Familiarity with testing frameworks (Jest, Cypress)',
    'Excellent communication skills'
];

export const MockDataService = {
    generateJobs: async (count: number = 10, _preferences?: UserPreferences): Promise<Job[]> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        return Array.from({ length: count }).map((_, index) => {
            const isRemote = Math.random() > 0.5;
            const type = isRemote ? 'Remote' : (Math.random() > 0.5 ? 'Hybrid' : 'On-site');

            return {
                id: `job-${Date.now()}-${index}`,
                title: TITLES[Math.floor(Math.random() * TITLES.length)],
                company: COMPANIES[Math.floor(Math.random() * COMPANIES.length)],
                location: isRemote ? 'Remote' : LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
                type: type,
                salary: `$${100 + Math.floor(Math.random() * 80)}k - $${180 + Math.floor(Math.random() * 50)}k`,
                postedAt: index === 0 ? 'Just now' : `${index + 1}h ago`,
                description: 'We are looking for a talented individual to join our team and help build the next generation of our product.',
                requirements: REQUIREMENTS.sort(() => 0.5 - Math.random()).slice(0, 3),
                tags: ['React', 'TypeScript', 'Tailwind', 'Node.js'].sort(() => 0.5 - Math.random()).slice(0, 3),
                isNew: index < 3
            };
        });
    }
};
