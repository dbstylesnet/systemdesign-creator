export type ProjectType = 'static' | 'cms' | 'monolith' | 'microservice' | 'spa' | 'ssr';
export type ScaleType = 'fixed' | 'high';

export interface QuizOption {
  id: string;
  label: string;
  correct: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  subtitle?: string;
  options: QuizOption[];
}

export interface ProjectTypeInfo {
  id: ProjectType;
  label: string;
  description: string;
  image: string;
}

export interface ScaleInfo {
  id: ScaleType;
  label: string;
  description: string;
  image: string;
}

export const projectTypes: ProjectTypeInfo[] = [
  { id: 'static', label: 'Static Website', description: 'Pre-built HTML/CSS/JS files served directly', image: '/images/static.png' },
  { id: 'cms', label: 'CMS', description: 'Content Management System for dynamic content', image: '/images/cms.png' },
  { id: 'monolith', label: 'Monolith', description: 'Single unified application codebase', image: '/images/monolith.png' },
  { id: 'microservice', label: 'Microservices', description: 'Distributed independent services', image: '/images/microservice.png' },
  { id: 'spa', label: 'SPA', description: 'Single Page Application with client routing', image: '/images/spa.png' },
  { id: 'ssr', label: 'SSR', description: 'Server-Side Rendered application', image: '/images/ssr.png' },
];

export const scaleOptions: ScaleInfo[] = [
  { id: 'fixed', label: 'Fixed Scale', description: 'Known number of users, predictable traffic', image: '/images/fixed-scale.png' },
  { id: 'high', label: 'High Scalability', description: 'Built to handle growing demand', image: '/images/high-scale.png' },
];

export function getQuestions(project: ProjectType, scale: ScaleType): QuizQuestion[] {
  const questions: Record<ProjectType, QuizQuestion[]> = {
    static: [
      {
        id: 'static-1',
        question: 'Which static site generator would you use?',
        subtitle: 'Choose the right tool for building static sites',
        options: [
          { id: 'hugo', label: 'Hugo', correct: true, explanation: 'Hugo is one of the fastest static site generators, written in Go. Excellent for blogs, documentation, and marketing sites.' },
          { id: 'gatsby', label: 'Gatsby', correct: true, explanation: 'Gatsby uses React and GraphQL to build blazing-fast static sites. Great for content-rich websites with complex data needs.' },
          { id: 'django', label: 'Django', correct: false, explanation: 'Django is a full-stack Python web framework, not a static site generator. It requires a server to run.' },
          { id: 'express', label: 'Express.js', correct: false, explanation: 'Express is a Node.js server framework. Static sites don\'t need a backend server.' },
        ],
      },
      {
        id: 'static-2',
        question: 'Where would you host your static site?',
        options: [
          { id: 'netlify', label: 'Netlify', correct: true, explanation: 'Netlify offers free hosting with CDN, continuous deployment, and serverless functions. Perfect for static sites.' },
          { id: 'vercel', label: 'Vercel', correct: true, explanation: 'Vercel provides edge network deployment with great DX. Excellent for static and JAMstack sites.' },
          { id: 'heroku', label: 'Heroku', correct: false, explanation: 'Heroku is designed for dynamic server applications. Overkill and costly for static content.' },
          { id: 'localhost', label: 'My Computer', correct: false, explanation: 'Hosting on your local machine means downtime when it\'s off, security risks, and poor performance for visitors.' },
        ],
      },
      {
        id: 'static-3',
        question: 'How should you optimize assets?',
        options: [
          { id: 'cdn', label: 'CDN + Compression', correct: true, explanation: 'A CDN distributes your assets globally and compression (gzip/brotli) reduces file sizes dramatically.' },
          { id: 'imageopt', label: 'Image Optimization', correct: true, explanation: 'Using WebP/AVIF formats and responsive images reduces load time significantly. Essential for performance.' },
          { id: 'noopt', label: 'No Optimization', correct: false, explanation: 'Without optimization, your site will have slow load times, high bounce rates, and poor SEO rankings.' },
          { id: 'rawupload', label: 'Upload Raw Files', correct: false, explanation: 'Uploading unoptimized files wastes bandwidth and creates a poor user experience.' },
        ],
      },
      {
        id: 'static-4',
        question: 'How would you handle forms on a static site?',
        options: [
          { id: 'formspree', label: 'Formspree / Netlify Forms', correct: true, explanation: 'Third-party form services handle submissions without needing a backend. Simple and effective.' },
          { id: 'serverless', label: 'Serverless Functions', correct: true, explanation: 'Serverless functions (Lambda, Netlify Functions) let you process forms without managing a server.' },
          { id: 'phpmail', label: 'PHP mail()', correct: false, explanation: 'Static sites don\'t run PHP. You can\'t use server-side languages on a static host.' },
          { id: 'noforms', label: 'Don\'t Support Forms', correct: false, explanation: 'Most websites need some form of user input. There are many serverless solutions available.' },
        ],
      },
      {
        id: 'static-5',
        question: 'Which version control strategy?',
        options: [
          { id: 'git', label: 'Git + CI/CD', correct: true, explanation: 'Git with automated deployments ensures consistent, trackable releases. Industry standard for a reason.' },
          { id: 'gitflow', label: 'Git Flow', correct: true, explanation: 'Git Flow provides a structured branching model. Good for teams with scheduled releases.' },
          { id: 'manual', label: 'Manual Copy', correct: false, explanation: 'Manually copying files leads to lost work, no history, and deployment errors.' },
          { id: 'novc', label: 'No Version Control', correct: false, explanation: 'Without version control you can\'t track changes, collaborate, or rollback mistakes.' },
        ],
      },
    ],

    cms: [
      {
        id: 'cms-1',
        question: 'Which CMS technology would you use?',
        subtitle: 'Pick the right content management platform',
        options: [
          { id: 'wordpress', label: 'WordPress', correct: true, explanation: 'WordPress powers 40%+ of the web. Massive plugin ecosystem, great for content-heavy sites. ' + (scale === 'high' ? 'For high scale, consider headless WordPress with WP Engine.' : 'Perfect for fixed-scale content sites.') },
          { id: 'drupal', label: 'Drupal', correct: true, explanation: 'Drupal excels at complex, enterprise-level content management. ' + (scale === 'high' ? 'Drupal handles high traffic well with proper caching.' : 'May be overkill for small fixed-scale projects.') },
          { id: 'react', label: 'React', correct: false, explanation: 'React is a UI library, not a CMS. It doesn\'t provide content management, admin panels, or content editing capabilities.' },
          { id: 'nextjs', label: 'Next.js', correct: false, explanation: 'Next.js is a React framework for building websites, not a CMS. You\'d need a separate CMS like Strapi or Contentful to manage content.' },
        ],
      },
      {
        id: 'cms-2',
        question: 'Which database for your CMS?',
        options: [
          { id: 'mysql', label: 'MySQL', correct: true, explanation: 'MySQL is the default choice for WordPress/Drupal. Well-tested, reliable, and widely supported by hosting providers.' },
          { id: 'postgresql', label: 'PostgreSQL', correct: true, explanation: 'PostgreSQL offers advanced features like JSON support and better concurrency. Great for Drupal and custom CMS setups.' },
          { id: 'mongodb', label: 'MongoDB', correct: false, explanation: 'Most traditional CMS platforms are built for relational databases. MongoDB would require a headless CMS designed for it.' },
          { id: 'redis', label: 'Redis', correct: false, explanation: 'Redis is an in-memory cache/store, not a primary database. Use it alongside your main DB for caching.' },
        ],
      },
      {
        id: 'cms-3',
        question: 'How would you handle caching?',
        options: [
          { id: 'cdncache', label: 'CDN + Page Cache', correct: true, explanation: 'CDN caching serves pages from edge locations globally. ' + (scale === 'high' ? 'Essential for high-traffic CMS sites.' : 'Improves performance even at fixed scale.') },
          { id: 'objectcache', label: 'Redis Object Cache', correct: true, explanation: 'Object caching reduces database queries significantly. WordPress + Redis can handle 10x more traffic.' },
          { id: 'nocache', label: 'No Caching', correct: false, explanation: 'CMS sites are database-heavy. Without caching, every page load hits the DB, causing slow response times.' },
          { id: 'browsercache', label: 'Browser Cache Only', correct: false, explanation: 'Browser caching alone doesn\'t help with server-side rendering. You need server-level caching too.' },
        ],
      },
      {
        id: 'cms-4',
        question: 'What hosting approach?',
        options: [
          { id: 'managed', label: 'Managed WordPress/CMS Host', correct: true, explanation: 'Managed hosting (WP Engine, Pantheon) handles security, updates, and scaling automatically. Best for peace of mind.' },
          { id: 'cloudvps', label: 'Cloud VPS (AWS/DigitalOcean)', correct: true, explanation: 'Cloud VPS gives you full control. ' + (scale === 'high' ? 'With auto-scaling groups, handles traffic spikes well.' : 'Cost-effective for predictable traffic.') },
          { id: 'shared', label: 'Shared Hosting', correct: false, explanation: 'Shared hosting has resource limits, poor performance, and security risks from other sites on the same server.' + (scale === 'high' ? ' Absolutely not suitable for high scale.' : '') },
          { id: 'local', label: 'Local Server', correct: false, explanation: 'Running a CMS on your local machine means no uptime guarantee, security vulnerabilities, and unreliable access.' },
        ],
      },
      {
        id: 'cms-5',
        question: 'How would you secure your CMS?',
        options: [
          { id: 'ssl_waf', label: 'SSL + WAF + Updates', correct: true, explanation: 'SSL encrypts traffic, WAF blocks attacks, and regular updates patch vulnerabilities. The security trifecta.' },
          { id: 'hardening', label: 'Server Hardening + 2FA', correct: true, explanation: 'Hardening the server config and adding 2FA to admin accounts prevents the most common attack vectors.' },
          { id: 'nosec', label: 'No Security Measures', correct: false, explanation: 'CMS platforms are heavily targeted by hackers. Without security, you will get compromised.' },
          { id: 'obscurity', label: 'Security by Obscurity', correct: false, explanation: 'Hiding your login page or CMS version is not real security. Attackers use automated scanners that find everything.' },
        ],
      },
    ],

    monolith: [
      {
        id: 'mono-1',
        question: 'Which framework for your monolith?',
        subtitle: 'Choose a battle-tested framework',
        options: [
          { id: 'django', label: 'Django', correct: true, explanation: 'Django provides batteries-included development with ORM, admin, auth built-in. Great for rapid development of monolithic apps.' },
          { id: 'rails', label: 'Ruby on Rails', correct: true, explanation: 'Rails follows convention over configuration. Extremely productive for building monolithic web applications quickly.' },
          { id: 'springboot', label: 'Spring Boot', correct: true, explanation: 'Spring Boot is enterprise-grade with excellent Java ecosystem support. ' + (scale === 'high' ? 'Handles high concurrency well with thread pools.' : 'Might be heavy for small projects.') },
          { id: 'bash', label: 'Bash Scripts', correct: false, explanation: 'Bash is for scripting and automation, not for building web applications. No routing, ORM, or security features.' },
        ],
      },
      {
        id: 'mono-2',
        question: 'Which database?',
        options: [
          { id: 'postgres', label: 'PostgreSQL', correct: true, explanation: 'PostgreSQL is the most advanced open-source database. ACID compliant, supports JSON, full-text search, and scales well.' },
          { id: 'mysql', label: 'MySQL', correct: true, explanation: 'MySQL is reliable and widely used. Good performance for read-heavy workloads with proper indexing.' },
          { id: 'sqlite', label: 'SQLite (Production)', correct: false, explanation: 'SQLite doesn\'t support concurrent writes and has no network access. Fine for development, not for production.' },
          { id: 'csv', label: 'CSV Files', correct: false, explanation: 'CSV files have no indexing, no ACID properties, no concurrent access. This is not a database solution.' },
        ],
      },
      {
        id: 'mono-3',
        question: 'Which architecture pattern?',
        options: [
          { id: 'mvc', label: 'MVC Pattern', correct: true, explanation: 'Model-View-Controller separates concerns cleanly. Most monolithic frameworks are built around MVC.' },
          { id: 'layered', label: 'Layered Architecture', correct: true, explanation: 'Layered architecture (presentation, business, data) provides clear boundaries and testability.' },
          { id: 'nopattern', label: 'No Pattern', correct: false, explanation: 'Without an architecture pattern, code becomes spaghetti quickly. Maintenance and debugging become nightmares.' },
          { id: 'random', label: 'Random File Structure', correct: false, explanation: 'Random organization makes it impossible for teams to work together and for anyone to understand the codebase.' },
        ],
      },
      {
        id: 'mono-4',
        question: 'How would you deploy?',
        options: [
          { id: 'docker', label: 'Docker + CI/CD', correct: true, explanation: 'Docker ensures consistent environments. CI/CD automates testing and deployment. The modern standard.' },
          { id: 'cloudvm', label: 'Cloud VM + Ansible', correct: true, explanation: 'Infrastructure as Code with Ansible on cloud VMs provides reproducible deployments. Good for teams familiar with ops.' },
          { id: 'usb', label: 'USB Drive', correct: false, explanation: 'Deploying via USB is not scalable, not automatable, and introduces human error at every step.' },
          { id: 'ftp', label: 'Manual FTP Upload', correct: false, explanation: 'FTP is insecure, manual, error-prone, and provides no rollback capability. Don\'t use it in 2024+.' },
        ],
      },
      {
        id: 'mono-5',
        question: 'How would you handle scaling?',
        options: [
          { id: 'vertical', label: 'Vertical Scaling + Cache', correct: true, explanation: 'Adding more resources to your server plus caching layers is the simplest scaling approach for monoliths. ' + (scale === 'high' ? 'Start here, then add horizontal scaling.' : 'Usually sufficient for fixed-scale apps.') },
          { id: 'loadbalancer', label: 'Load Balancer + Replicas', correct: true, explanation: 'Horizontal scaling with a load balancer distributes traffic across multiple instances. ' + (scale === 'high' ? 'Essential for high-traffic monoliths.' : 'May be premature for fixed scale.') },
          { id: 'hope', label: 'Just Hope It Works', correct: false, explanation: 'Hope is not a strategy. Without a scaling plan, your app will crash under load.' },
          { id: 'singleforever', label: 'Single Server Forever', correct: false, explanation: 'A single server has hardware limits. Even fixed-scale apps should have a failover plan.' },
        ],
      },
    ],

    microservice: [
      {
        id: 'micro-1',
        question: 'How should services communicate?',
        subtitle: 'Choose the right inter-service communication',
        options: [
          { id: 'rest', label: 'REST APIs', correct: true, explanation: 'REST is simple, well-understood, and works with any language. Good default for synchronous service communication.' },
          { id: 'grpc', label: 'gRPC', correct: true, explanation: 'gRPC uses Protocol Buffers for efficient, type-safe communication. ' + (scale === 'high' ? '10x faster than REST for high-throughput systems.' : 'Great even at smaller scale for type safety.') },
          { id: 'shareddb', label: 'Shared Database', correct: false, explanation: 'Sharing a database between microservices creates tight coupling, defeating the entire purpose of microservices.' },
          { id: 'filesystem', label: 'File System', correct: false, explanation: 'File-based communication is slow, unreliable, and doesn\'t work across distributed systems.' },
        ],
      },
      {
        id: 'micro-2',
        question: 'How would you containerize services?',
        options: [
          { id: 'k8s', label: 'Docker + Kubernetes', correct: true, explanation: 'Kubernetes orchestrates containers with auto-scaling, self-healing, and service discovery. ' + (scale === 'high' ? 'The gold standard for high-scale microservices.' : 'Powerful but has a learning curve.') },
          { id: 'compose', label: 'Docker Compose', correct: true, explanation: 'Docker Compose manages multi-container apps simply. ' + (scale === 'high' ? 'Good for development, but consider K8s for production at high scale.' : 'Perfect for fixed-scale deployments.') },
          { id: 'nocontainers', label: 'No Containers', correct: false, explanation: 'Without containers, managing dependencies and deployment across services becomes extremely complex.' },
          { id: 'vmper', label: 'VM Per Service', correct: false, explanation: 'A VM per microservice wastes enormous resources. Containers are lightweight and purpose-built for this.' },
        ],
      },
      {
        id: 'micro-3',
        question: 'How to handle service discovery?',
        options: [
          { id: 'consul', label: 'Consul', correct: true, explanation: 'HashiCorp Consul provides service discovery, health checking, and key-value storage. Battle-tested at scale.' },
          { id: 'k8sdns', label: 'Kubernetes DNS', correct: true, explanation: 'If using K8s, built-in DNS service discovery is simple and effective. Services find each other by name.' },
          { id: 'hardcoded', label: 'Hardcoded IPs', correct: false, explanation: 'Hardcoded IPs break when services move, scale, or restart. This is fragile and unmaintainable.' },
          { id: 'nodiscovery', label: 'No Discovery', correct: false, explanation: 'Without service discovery, services can\'t find each other dynamically. Manual configuration doesn\'t scale.' },
        ],
      },
      {
        id: 'micro-4',
        question: 'What database strategy?',
        options: [
          { id: 'dbperservice', label: 'Database Per Service', correct: true, explanation: 'Each service owns its data. This ensures loose coupling and independent scaling. The microservice way.' },
          { id: 'eventsourcing', label: 'Event Sourcing + CQRS', correct: true, explanation: 'Event sourcing captures all changes as events. ' + (scale === 'high' ? 'Excellent for high-scale systems with audit requirements.' : 'Can add complexity but provides great traceability.') },
          { id: 'singledb', label: 'Single Shared Database', correct: false, explanation: 'A shared database creates a single point of failure and tight coupling between all services.' },
          { id: 'singlesqlite', label: 'One SQLite File', correct: false, explanation: 'SQLite doesn\'t support network access or concurrent writes. Impossible for distributed microservices.' },
        ],
      },
      {
        id: 'micro-5',
        question: 'How to handle async communication?',
        options: [
          { id: 'rabbitmq', label: 'RabbitMQ', correct: true, explanation: 'RabbitMQ is a reliable message broker with routing, queuing, and delivery guarantees. Great for task distribution.' },
          { id: 'kafka', label: 'Apache Kafka', correct: true, explanation: 'Kafka handles massive event streams with persistence. ' + (scale === 'high' ? 'The go-to for high-throughput event-driven systems.' : 'May be overkill for smaller systems but future-proofs well.') },
          { id: 'directhttp', label: 'Direct HTTP Calls Only', correct: false, explanation: 'Synchronous-only communication creates cascading failures. If one service is slow, everything slows down.' },
          { id: 'email', label: 'Email Notifications', correct: false, explanation: 'Email is not a message queue. It\'s unreliable, slow, and not designed for inter-service communication.' },
        ],
      },
    ],

    spa: [
      {
        id: 'spa-1',
        question: 'Which frontend framework?',
        subtitle: 'Choose your SPA framework',
        options: [
          { id: 'react', label: 'React', correct: true, explanation: 'React has the largest ecosystem, excellent community support, and flexible architecture. The most popular choice for SPAs.' },
          { id: 'vue', label: 'Vue.js', correct: true, explanation: 'Vue offers a gentle learning curve with great documentation. Progressive framework that scales from simple to complex.' },
          { id: 'angular', label: 'Angular', correct: true, explanation: 'Angular is a complete framework with dependency injection, RxJS, and TypeScript built-in. ' + (scale === 'high' ? 'Great for large enterprise SPAs.' : 'May be heavy for smaller apps.') },
          { id: 'jquery', label: 'jQuery', correct: false, explanation: 'jQuery is a DOM manipulation library from 2006, not a framework for building SPAs. No component model, no routing, no state management.' },
        ],
      },
      {
        id: 'spa-2',
        question: 'How would you manage state?',
        options: [
          { id: 'zustand', label: 'Zustand', correct: true, explanation: 'Zustand is lightweight, simple, and performant. Perfect for most SPA state management needs without boilerplate.' },
          { id: 'redux', label: 'Redux Toolkit', correct: true, explanation: 'Redux provides predictable state with great DevTools. ' + (scale === 'high' ? 'Scales well for complex, large applications.' : 'May have more boilerplate than needed for smaller apps.') },
          { id: 'context', label: 'React Context + useReducer', correct: true, explanation: 'Built-in solution that works for moderate complexity. No extra dependencies needed.' },
          { id: 'localstorage', label: 'Only localStorage', correct: false, explanation: 'localStorage is for persistence, not state management. No reactivity, no structure, and synchronous API blocks the main thread.' },
        ],
      },
      {
        id: 'spa-3',
        question: 'What folder structure?',
        options: [
          { id: 'feature', label: 'Feature-Based', correct: true, explanation: 'Organizing by feature (auth/, dashboard/, settings/) keeps related code together. Scales well as the app grows.' },
          { id: 'typebased', label: 'Type-Based (components/hooks/utils)', correct: true, explanation: 'Grouping by type is simple and familiar. Works well for small-to-medium SPAs.' },
          { id: 'flat', label: 'Everything in One Folder', correct: false, explanation: 'A flat structure becomes unmanageable quickly. Finding files becomes a nightmare as the project grows.' },
          { id: 'random', label: 'No Organization', correct: false, explanation: 'Random file placement makes the codebase impossible to navigate for you or any teammate.' },
        ],
      },
      {
        id: 'spa-4',
        question: 'How would you communicate with the backend?',
        options: [
          { id: 'rest', label: 'REST API + React Query', correct: true, explanation: 'REST with React Query provides caching, refetching, and loading states out of the box. Clean and efficient.' },
          { id: 'graphql', label: 'GraphQL + Apollo', correct: true, explanation: 'GraphQL lets the client request exactly the data it needs. ' + (scale === 'high' ? 'Reduces over-fetching at scale.' : 'Great for complex data requirements.') },
          { id: 'directdb', label: 'Direct Database Access', correct: false, explanation: 'SPAs run in the browser — you can\'t and shouldn\'t connect directly to a database. Security nightmare.' },
          { id: 'filebased', label: 'Read JSON Files', correct: false, explanation: 'Static JSON files can\'t handle user input, updates, or dynamic data. Not a real API solution.' },
        ],
      },
      {
        id: 'spa-5',
        question: 'How would you build and deploy?',
        options: [
          { id: 'vite_vercel', label: 'Vite + Vercel/Netlify', correct: true, explanation: 'Vite offers lightning-fast builds and HMR. Vercel/Netlify provide CDN hosting with automatic deployments.' },
          { id: 'webpack_aws', label: 'Webpack + AWS S3/CloudFront', correct: true, explanation: 'Webpack is mature and configurable. S3 + CloudFront gives you full control over CDN distribution. ' + (scale === 'high' ? 'AWS scales infinitely.' : 'Good enterprise option.') },
          { id: 'nobuild', label: 'No Build Tool', correct: false, explanation: 'Modern SPAs need bundling, tree-shaking, and minification. Without a build tool, you ship massive, slow bundles.' },
          { id: 'ftp', label: 'FTP Upload', correct: false, explanation: 'FTP provides no automation, no rollback, and no CI/CD integration. Error-prone manual process.' },
        ],
      },
    ],

    ssr: [
      {
        id: 'ssr-1',
        question: 'Which SSR framework?',
        subtitle: 'Pick your server-rendering framework',
        options: [
          { id: 'nextjs', label: 'Next.js', correct: true, explanation: 'Next.js is the most popular React SSR framework. Supports SSR, SSG, ISR, and API routes. Massive ecosystem.' },
          { id: 'nuxt', label: 'Nuxt.js', correct: true, explanation: 'Nuxt brings SSR to Vue.js with auto-routing, middleware, and great conventions. The Vue equivalent of Next.js.' },
          { id: 'sveltekit', label: 'SvelteKit', correct: true, explanation: 'SvelteKit offers SSR with minimal JavaScript shipped to the client. Excellent performance and developer experience.' },
          { id: 'jquery', label: 'jQuery', correct: false, explanation: 'jQuery is a DOM manipulation library. It has no server-side rendering capabilities whatsoever.' },
        ],
      },
      {
        id: 'ssr-2',
        question: 'Which rendering strategy?',
        options: [
          { id: 'ssr', label: 'Server-Side Rendering', correct: true, explanation: 'SSR generates HTML on each request. Best for dynamic, personalized content that needs SEO.' },
          { id: 'isr', label: 'Incremental Static Regeneration', correct: true, explanation: 'ISR combines static generation with on-demand revalidation. ' + (scale === 'high' ? 'Perfect for high-traffic sites with content updates.' : 'Good balance of performance and freshness.') },
          { id: 'csronly', label: 'Client-Side Only', correct: false, explanation: 'If you\'re doing client-side only rendering, you don\'t need an SSR framework. That\'s just an SPA.' },
          { id: 'prerenderall', label: 'Pre-render Everything at Build', correct: false, explanation: 'Pre-rendering all pages works only for fully static content. Dynamic data or user-specific pages can\'t be pre-rendered.' },
        ],
      },
      {
        id: 'ssr-3',
        question: 'How to handle data fetching?',
        options: [
          { id: 'servercomp', label: 'Server Components', correct: true, explanation: 'React Server Components fetch data on the server with zero client-side JavaScript. Modern and efficient.' },
          { id: 'getserverside', label: 'getServerSideProps / Loaders', correct: true, explanation: 'Framework-specific data loading functions run on the server before rendering. Proven pattern for SSR.' },
          { id: 'clientonly', label: 'Client-Side fetch Only', correct: false, explanation: 'Client-only fetching defeats the purpose of SSR. The initial HTML won\'t contain data, losing SEO and performance benefits.' },
          { id: 'hardcoded', label: 'Hardcoded Data', correct: false, explanation: 'Hardcoded data isn\'t a real solution. Your app needs to fetch from actual data sources.' },
        ],
      },
      {
        id: 'ssr-4',
        question: 'How to handle caching?',
        options: [
          { id: 'edge', label: 'Edge Caching + CDN', correct: true, explanation: 'Edge caching serves responses from locations closest to users. ' + (scale === 'high' ? 'Critical for global high-traffic SSR apps.' : 'Improves performance for all users.') },
          { id: 'redis', label: 'Redis Response Cache', correct: true, explanation: 'Redis caches rendered HTML to avoid re-rendering identical pages. Dramatically reduces server load.' },
          { id: 'nocache', label: 'No Caching', correct: false, explanation: 'SSR is CPU-intensive. Without caching, every request triggers a full render, leading to high costs and latency.' },
          { id: 'browseronly', label: 'Browser Cache Only', correct: false, explanation: 'Browser caching doesn\'t help with the server-side rendering cost. You still render every first visit.' },
        ],
      },
      {
        id: 'ssr-5',
        question: 'Where would you deploy?',
        options: [
          { id: 'vercel', label: 'Vercel', correct: true, explanation: 'Vercel is built by the Next.js team. Zero-config deployment with edge functions and global CDN.' },
          { id: 'aws', label: 'AWS (Lambda + CloudFront)', correct: true, explanation: 'AWS gives full control with serverless SSR via Lambda@Edge. ' + (scale === 'high' ? 'Infinite scalability with pay-per-use.' : 'More complex but very capable.') },
          { id: 'statichost', label: 'Static File Host', correct: false, explanation: 'SSR requires a server to render pages. A static file host can\'t execute server-side code.' },
          { id: 'localdev', label: 'Local Dev Server', correct: false, explanation: 'A local development server is not production infrastructure. No uptime, no security, no scaling.' },
        ],
      },
    ],
  };

  return questions[project] || [];
}

export function calculateScore(
  totalQuestions: number,
  correctFirstTry: number
): { score: number; rating: string; message: string } {
  const score = Math.round((correctFirstTry / totalQuestions) * 10);

  let rating: string;
  let message: string;

  if (score >= 9) {
    rating = 'System Design Master';
    message = 'Outstanding! You have an excellent understanding of system architecture.';
  } else if (score >= 7) {
    rating = 'Senior Architect';
    message = 'Great job! You have solid knowledge with room for some advanced topics.';
  } else if (score >= 5) {
    rating = 'Mid-Level Developer';
    message = 'Good foundation! Study the explanations to level up your architecture skills.';
  } else if (score >= 3) {
    rating = 'Junior Developer';
    message = 'Keep learning! Review the correct answers and their explanations carefully.';
  } else {
    rating = 'Beginner';
    message = 'Everyone starts somewhere! Focus on understanding why each technology choice matters.';
  }

  return { score, rating, message };
}
