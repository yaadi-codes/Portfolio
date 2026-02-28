/**
 * Project Data Structure
 * 
 * Extensible data model for portfolio projects.
 * Add new projects by appending to the PROJECTS array.
 */

export interface TechItem {
    name: string;
    icon?: string;  // Optional icon path
}

export interface ProjectLinks {
    live?: string;
    github?: string;
    docs?: string;
    // Extensible - add more link types as needed
}

export interface Project {
    id: string;
    title: string;
    subtitle: string;           // Short tagline
    description: string;        // Full description for spotlight
    category: string;           // "Web App", "API", "Mobile", etc.
    techStack: TechItem[];
    screenshots: string[];      // Array of image paths (first is primary)
    links: ProjectLinks;
    isClickable?: boolean;      // Whether project can be selected in carousel
}

/**
 * Portfolio Projects
 * 
 * Order determines carousel order.
 * First project is shown in spotlight by default.
 */
export const PROJECTS: Project[] = [
    {
        id: 'portfolio',
        title: 'Personal Portfolio',
        subtitle: 'A modern developer showcase',
        description: 'A responsive portfolio website built with React 19 and TypeScript. Features scroll-based animations, intersection observers for lazy loading, and a stunning dark theme with blue accents. Designed for performance and visual impact.',
        category: 'Web App',
        techStack: [
            { name: 'React', icon: '/assets/icons/react-2.svg' },
            { name: 'TypeScript', icon: '/assets/icons/typescript.svg' },
            { name: 'Vite', icon: '/assets/icons/vitejs.svg' },
            { name: 'CSS3', icon: '/assets/icons/css-3.svg' },
        ],
        screenshots: [
            '/assets/images/projects/Portfolio-HomePage.png',
        ],
        links: {
            live: 'https://portfolio-one-kohl-21.vercel.app/',
            github: 'https://github.com/yaadi-codes/Portfolio',
        },
        isClickable: true,
    },
    {
    id: 'tribute',
    title: 'Anisa Web Tribute',
    subtitle: 'A digital memorial',
    description: 'A responsive tribute website created to honor and preserve the memory of Anisa Dilworth. Built with care and intention, the site features a timeline of her life, a digital tribute book for messages, and thoughtfully designed sections that celebrate her story. Designed to be accessible, emotionally resonant, and lasting — ensuring her memory lives on through the web.',
    category: 'Web App',
    techStack: [
        { name: 'React', icon: '/assets/icons/react-2.svg' },
        { name: 'TypeScript', icon: '/assets/icons/typescript.svg' },
        { name: 'Vite', icon: '/assets/icons/vitejs.svg' },
        { name: 'CSS3', icon: '/assets/icons/css-3.svg' },
        { name: 'Firebase', icon: '/assets/icons/firebase.svg' },
    ],
    screenshots: [
        '/assets/images/projects/AnisaTribute-HomePage.png',
    ],
    links: {
        live: 'https://anisa-web-tribute.vercel.app/',
        github: 'https://github.com/yaadi-codes/anisa-web-tribute',
    },
    isClickable: true,
    },
    {
        id: '',
        title: '',
        subtitle: '',
        description: '',
        category: '',
        techStack: [],
        screenshots: [],
        links: {},
    },
    {
        id: '',
        title: '',
        subtitle: '',
        description: '',
        category: '',
        techStack: [],
        screenshots: [],
        links: {},
    },
    {
        id: '',
        title: '',
        subtitle: '',
        description: '',
        category: '',
        techStack: [],
        screenshots: [],
        links: {},
    },
    {
        id: '',
        title: '',
        subtitle: '',
        description: '',
        category: '',
        techStack: [],
        screenshots: [],
        links: {},
    },
    {
        id: '',
        title: '',
        subtitle: '',
        description: '',
        category: '',
        techStack: [],
        screenshots: [],
        links: {},
    },
];

export default PROJECTS;
