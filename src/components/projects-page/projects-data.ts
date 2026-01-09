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
        id: 'ecommerce',
        title: 'E-Commerce Platform',
        subtitle: 'Full-stack shopping experience',
        description: 'Complete e-commerce solution with product management, shopping cart, secure checkout, and admin dashboard. Implements JWT authentication, Stripe payment integration, and real-time inventory updates.',
        category: 'Web App',
        techStack: [
            { name: 'Next.js' },
            { name: 'Node.js', icon: '/assets/icons/nodejs-icon.svg' },
            { name: 'MongoDB', icon: '/assets/icons/mongodb-icon.svg' },
            { name: 'Stripe' },
        ],
        screenshots: [
            '/assets/images/projects/ecommerce-1.png',
        ],
        links: {
            live: '#',
            github: '#',
        },
    },
    {
        id: 'api-service',
        title: 'REST API Service',
        subtitle: 'Scalable backend architecture',
        description: 'Production-ready RESTful API with comprehensive documentation, rate limiting, caching, and automated testing. Deployed on cloud infrastructure with CI/CD pipeline for seamless updates.',
        category: 'Backend',
        techStack: [
            { name: 'Node.js', icon: '/assets/icons/nodejs-icon.svg' },
            { name: 'Express' },
            { name: 'PostgreSQL' },
            { name: 'Redis' },
        ],
        screenshots: [
            '/assets/images/projects/api-1.png',
        ],
        links: {
            github: '#',
            docs: '#',
        },
    },
    {
        id: 'weather-app',
        title: 'Weather Dashboard',
        subtitle: 'Real-time forecasts',
        description: 'Interactive weather application with location-based forecasts, interactive maps, and 7-day predictions. Features dark mode, temperature unit conversion, and weather alerts.',
        category: 'Web App',
        techStack: [
            { name: 'React', icon: '/assets/icons/react-2.svg' },
            { name: 'OpenWeather API' },
            { name: 'Mapbox' },
        ],
        screenshots: [],
        links: {
            github: '#',
        },
    },
    {
        id: 'fitness-tracker',
        title: 'Fitness Tracker',
        subtitle: 'Mobile workout companion',
        description: 'Mobile-first workout logging app with progress charts, goal tracking, and workout templates. Syncs across devices with real-time updates.',
        category: 'Mobile',
        techStack: [
            { name: 'React Native' },
            { name: 'Firebase' },
            { name: 'Chart.js' },
        ],
        screenshots: [],
        links: {
            live: '#',
            github: '#',
        },
    },
    {
        id: 'chat-app',
        title: 'Real-time Chat',
        subtitle: 'WebSocket messaging',
        description: 'Real-time chat application with private rooms, message history, typing indicators, and file sharing. Built with WebSocket for instant message delivery.',
        category: 'Web App',
        techStack: [
            { name: 'Socket.io' },
            { name: 'Express' },
            { name: 'React', icon: '/assets/icons/react-2.svg' },
        ],
        screenshots: [],
        links: {
            github: '#',
        },
    },
];

export default PROJECTS;
