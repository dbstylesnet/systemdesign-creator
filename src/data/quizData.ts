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

function padOptionsToEight(questionId: string, options: QuizOption[]): QuizOption[] {
  if (options.length >= 8) return options;

  const padded: QuizOption[] = [...options];

  const makeFalse = (suffix: string, label: string, explanation: string): QuizOption => ({
    id: `${questionId}-${suffix}`,
    label,
    correct: false,
    explanation,
  });

  const distractorPool: Array<{ suffix: string; label: string; explanation: string }> = [
    {
      suffix: 'fastify',
      label: 'Fastify',
      explanation: 'Fastify is a Node.js web framework focused on performance and plugins. It can serve HTTP APIs and server-rendered apps when you need a backend runtime.',
    },
    {
      suffix: 'koa',
      label: 'Koa',
      explanation: 'Koa is a minimalist Node.js web framework that composes middleware. It’s a backend server framework rather than a static build/deploy tool.',
    },
    {
      suffix: 'nestjs',
      label: 'NestJS',
      explanation: 'NestJS is a TypeScript Node.js framework with modules and DI. It’s used to build backend services and APIs, not as a hosting or build platform by itself.',
    },
    {
      suffix: 'nginx',
      label: 'Nginx',
      explanation: 'Nginx is a web server and reverse proxy. It commonly sits in front of apps for TLS termination, caching, and routing, but it isn’t a site generator or application framework.',
    },
    {
      suffix: 'haproxy',
      label: 'HAProxy',
      explanation: 'HAProxy is a high-performance load balancer and proxy. It helps distribute traffic and improve availability, but it’s not an application framework or deployment platform.',
    },
    {
      suffix: 'terraform',
      label: 'Terraform',
      explanation: 'Terraform is infrastructure-as-code for provisioning cloud resources. It’s used to manage infrastructure, not to directly implement app runtime behavior.',
    },
    {
      suffix: 'pulumi',
      label: 'Pulumi',
      explanation: 'Pulumi is infrastructure-as-code using real programming languages. It’s used to provision and manage infra, not to serve application requests directly.',
    },
    {
      suffix: 'kustomize',
      label: 'Kustomize',
      explanation: 'Kustomize customizes Kubernetes manifests. It’s an operations/deployment tool, not an application runtime or framework.',
    },
    {
      suffix: 'cloud-run',
      label: 'Google Cloud Run',
      explanation: 'Cloud Run is a serverless container platform for running HTTP services. It’s a deployment/runtime choice for backends, not a static site generator.',
    },
    {
      suffix: 'ecs-fargate',
      label: 'AWS ECS (Fargate)',
      explanation: 'ECS on Fargate runs containers without managing servers. It’s a deployment/runtime option for services, not a framework or content platform.',
    },
    {
      suffix: 'azure-static-web-apps',
      label: 'Azure Static Web Apps',
      explanation: 'Azure Static Web Apps hosts static frontends with CI integration and edge delivery. It’s a hosting option, not an application framework.',
    },
    {
      suffix: 'cloudfront',
      label: 'AWS CloudFront',
      explanation: 'CloudFront is a CDN for caching and distributing content globally. It improves delivery, but it doesn’t generate your site or implement backend logic.',
    },
  ];

  // Deterministic "shuffle" based on questionId.
  let h = 0;
  for (let i = 0; i < questionId.length; i++) h = (h * 31 + questionId.charCodeAt(i)) >>> 0;

  const usedSuffixes = new Set(padded.map(o => o.id.replace(`${questionId}-`, '')));
  let pickIndex = h % distractorPool.length;

  while (padded.length < 8) {
    const candidate = distractorPool[pickIndex % distractorPool.length];
    pickIndex++;
    if (!candidate) continue;
    if (usedSuffixes.has(candidate.suffix)) continue;

    const opt = makeFalse(candidate.suffix, candidate.label, candidate.explanation);
    if (padded.some(o => o.id === opt.id)) continue;
    padded.push(opt);
    usedSuffixes.add(candidate.suffix);
  }

  return padded;
}

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
          { id: 'jekyll', label: 'Jekyll', correct: true, explanation: 'Jekyll is a mature Ruby-based SSG, native to GitHub Pages. Ideal for blogs and documentation sites.' },
          { id: 'eleventy', label: 'Eleventy (11ty)', correct: true, explanation: 'Eleventy is a flexible, zero-JS-by-default SSG that supports many templating languages. Great for static sites.' },
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
          { id: 'ghpages', label: 'GitHub Pages', correct: true, explanation: 'GitHub Pages serves static sites from a repo with CDN-backed hosting. Free and integrated with Git workflows.' },
          { id: 'cfpages', label: 'Cloudflare Pages', correct: true, explanation: 'Cloudflare Pages offers global edge hosting, previews, and CI integration—built for static frontends.' },
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
          { id: 'minify', label: 'Minify + Tree-shake JS/CSS', correct: true, explanation: 'Removing dead code and minifying bundles cuts parse and download time. Standard for production static builds.' },
          { id: 'cacheheaders', label: 'Long-lived Cache Headers', correct: true, explanation: 'Fingerprinted assets with immutable cache headers let browsers reuse files across visits.' },
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
          { id: 'backendapi', label: 'Separate Backend API', correct: true, explanation: 'The SPA or static site POSTs to your API (BaaS or custom). The static host only serves files.' },
          { id: 'zapier', label: 'Webhook to Zapier / Make', correct: true, explanation: 'No-code automation endpoints can receive form posts and route to email, CRM, or sheets.' },
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
          { id: 'trunk', label: 'Trunk-Based + Protected Main', correct: true, explanation: 'Short-lived branches merged frequently with protected main and CI gates reduce integration pain.' },
          { id: 'prpreview', label: 'PR Previews per Branch', correct: true, explanation: 'Deploy previews for every PR catch regressions before merge—standard on Netlify/Vercel/Cloudflare.' },
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
          { id: 'strapi', label: 'Strapi', correct: true, explanation: 'Strapi is a popular open-source headless CMS with REST/GraphQL APIs—pairs with any frontend.' },
          { id: 'contentful', label: 'Contentful', correct: true, explanation: 'Contentful is a hosted headless CMS with strong APIs and editorial workflows. Common for JAMstack.' },
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
          { id: 'mariadb', label: 'MariaDB', correct: true, explanation: 'MariaDB is a MySQL-compatible drop-in widely used with WordPress and LAMP stacks.' },
          { id: 'sqlserver', label: 'Microsoft SQL Server', correct: true, explanation: 'SQL Server is a valid production RDBMS for enterprise .NET or hybrid CMS stacks when licensing fits.' },
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
          { id: 'varnish', label: 'Varnish HTTP Cache', correct: true, explanation: 'Varnish sits in front of PHP CMS stacks and serves cached HTML fast—common for high-traffic WordPress/Drupal.' },
          { id: 'opcache', label: 'OPcache + Opcode Tuning', correct: true, explanation: 'PHP OPcache avoids recompiling scripts every request. Essential baseline performance for PHP-based CMS.' },
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
          { id: 'lightsail', label: 'AWS Lightsail / Managed VM', correct: true, explanation: 'Simple VMs with snapshots and static IPs are a practical middle ground between shared hosting and full cloud ops.' },
          { id: 'k8s', label: 'Kubernetes for a Simple Blog', correct: false, explanation: 'K8s is heavy operational overhead for a typical CMS. Use managed hosting or a single VM unless you truly need orchestration.' },
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
          { id: 'ratelimit', label: 'Rate Limits + CAPTCHA on Login', correct: true, explanation: 'Throttling and bot challenges stop brute-force and credential-stuffing against wp-login and admin routes.' },
          { id: 'leastpriv', label: 'Least-Privilege DB + File Permissions', correct: true, explanation: 'Separate DB users with minimal rights and locked-down uploads reduce blast radius when a plugin is exploited.' },
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
          { id: 'laravel', label: 'Laravel', correct: true, explanation: 'Laravel is a full-featured PHP framework with elegant syntax, queues, and ecosystem—classic monolith choice.' },
          { id: 'bash', label: 'Bash Scripts', correct: false, explanation: 'Bash is for scripting and automation, not for building web applications. No routing, ORM, or security features.' },
          { id: 'excel', label: 'Excel + Macros', correct: false, explanation: 'Spreadsheets are not a web stack—no HTTP layer, sessions, or safe multi-user concurrency for an app backend.' },
        ],
      },
      {
        id: 'mono-2',
        question: 'Which database?',
        options: [
          { id: 'postgres', label: 'PostgreSQL', correct: true, explanation: 'PostgreSQL is the most advanced open-source database. ACID compliant, supports JSON, full-text search, and scales well.' },
          { id: 'mysql', label: 'MySQL', correct: true, explanation: 'MySQL is reliable and widely used. Good performance for read-heavy workloads with proper indexing.' },
          { id: 'mariadb', label: 'MariaDB', correct: true, explanation: 'MariaDB is a proven MySQL-compatible RDBMS commonly used in monolith LAMP/LEMP stacks.' },
          { id: 'sqlserver', label: 'Microsoft SQL Server', correct: true, explanation: 'SQL Server is a solid production choice for .NET monoliths and enterprise deployments.' },
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
          { id: 'hexagonal', label: 'Hexagonal / Ports & Adapters', correct: true, explanation: 'Isolates domain logic from I/O so you can swap DBs, queues, and HTTP frameworks with less pain.' },
          { id: 'clean', label: 'Clean Architecture', correct: true, explanation: 'Dependency rule keeps frameworks at the edges—good for long-lived monoliths that may evolve.' },
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
          { id: 'paas', label: 'PaaS (Render, Fly.io, Heroku-style)', correct: true, explanation: 'Push-to-deploy platforms handle runtime, TLS, and rollbacks—great when you want less ops than raw VMs.' },
          { id: 'gha', label: 'GitHub Actions → Staging → Prod', correct: true, explanation: 'Pipeline with tests, gated promotions, and artifacts is standard practice even without containers.' },
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
          { id: 'readreplica', label: 'Read Replicas + Query Optimization', correct: true, explanation: 'Offloading reads to replicas and fixing slow queries extends monolith life before sharding.' },
          { id: 'jobqueue', label: 'Background Job Queue', correct: true, explanation: 'Moving heavy work off the web workers (Celery, Sidekiq, Bull) keeps latency stable under load.' },
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
          { id: 'graphql', label: 'GraphQL (BFF or Federated)', correct: true, explanation: 'GraphQL can front multiple services behind one schema or subgraph—useful when clients need flexible aggregates.' },
          { id: 'asyncmsg', label: 'Async Messaging + Idempotent Handlers', correct: true, explanation: 'For many workflows, services should talk via queues/events—not every interaction needs a synchronous RPC chain.' },
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
          { id: 'ecs', label: 'AWS ECS / Fargate', correct: true, explanation: 'Managed container orchestration without running your own control plane—common production choice on AWS.' },
          { id: 'nomad', label: 'Nomad + Docker', correct: true, explanation: 'HashiCorp Nomad schedules containers and non-container workloads with a simpler ops model than full K8s.' },
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
          { id: 'etcd', label: 'etcd / Control-Plane Registry', correct: true, explanation: 'Many stacks register instances in etcd or similar for coordination—core to dynamic cluster membership.' },
          { id: 'cloudmap', label: 'AWS Cloud Map / Cloud DNS', correct: true, explanation: 'Cloud-native DNS-based discovery integrates with ECS, Lambda, and API Gateway for dynamic endpoints.' },
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
          { id: 'polyglot', label: 'Polyglot Persistence', correct: true, explanation: 'Different services pick the right store (SQL, document, cache) without forcing one global schema.' },
          { id: 'saga', label: 'Saga / Outbox for Cross-Service Writes', correct: true, explanation: 'Distributed transactions become sagas with compensations or outbox patterns—not two-phase commit across 10 DBs.' },
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
          { id: 'sqs', label: 'AWS SQS / SNS', correct: true, explanation: 'Managed queues and pub/sub remove broker ops and integrate tightly with Lambda and ECS workloads.' },
          { id: 'redisstreams', label: 'Redis Streams', correct: true, explanation: 'Lightweight streaming with consumer groups works well for internal events when you already run Redis.' },
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
          { id: 'svelte', label: 'Svelte', correct: true, explanation: 'Svelte compiles components to lean JS—great DX and performance for SPAs without a heavy runtime.' },
          { id: 'jquery', label: 'jQuery', correct: false, explanation: 'jQuery is a DOM manipulation library from 2006, not a framework for building SPAs. No component model, no routing, no state management.' },
          { id: 'htmx', label: 'HTMX Alone', correct: false, explanation: 'HTMX enhances HTML with partial updates—it is not a full SPA framework (no client router/state model like React/Vue).' },
        ],
      },
      {
        id: 'spa-2',
        question: 'How would you manage state?',
        options: [
          { id: 'zustand', label: 'Zustand', correct: true, explanation: 'Zustand is lightweight, simple, and performant. Perfect for most SPA state management needs without boilerplate.' },
          { id: 'redux', label: 'Redux Toolkit', correct: true, explanation: 'Redux provides predictable state with great DevTools. ' + (scale === 'high' ? 'Scales well for complex, large applications.' : 'May have more boilerplate than needed for smaller apps.') },
          { id: 'context', label: 'React Context + useReducer', correct: true, explanation: 'Built-in solution that works for moderate complexity. No extra dependencies needed.' },
          { id: 'mobx', label: 'MobX', correct: true, explanation: 'MobX uses transparent reactivity—productive for large object graphs and teams preferring OOP style.' },
          { id: 'localstorage', label: 'Only localStorage', correct: false, explanation: 'localStorage is for persistence, not state management. No reactivity, no structure, and synchronous API blocks the main thread.' },
          { id: 'windowglobals', label: 'window.* Global Variables', correct: false, explanation: 'Stuffing state on window is untyped, race-prone, and impossible to test—use a real store or context.' },
        ],
      },
      {
        id: 'spa-3',
        question: 'What folder structure?',
        options: [
          { id: 'feature', label: 'Feature-Based', correct: true, explanation: 'Organizing by feature (auth/, dashboard/, settings/) keeps related code together. Scales well as the app grows.' },
          { id: 'typebased', label: 'Type-Based (components/hooks/utils)', correct: true, explanation: 'Grouping by type is simple and familiar. Works well for small-to-medium SPAs.' },
          { id: 'domain', label: 'Domain Modules / Slices', correct: true, explanation: 'Align folders with business capabilities so UI, hooks, and API clients for one domain live together.' },
          { id: 'routes', label: 'Route Colocation (Remix-style)', correct: true, explanation: 'Keeping loaders, actions, and UI next to the route scales well as navigation grows.' },
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
          { id: 'trpc', label: 'tRPC + Zod', correct: true, explanation: 'End-to-end typesafe RPC over HTTP fits SPA + TypeScript monorepos without GraphQL overhead.' },
          { id: 'websocket', label: 'WebSocket + REST Hybrid', correct: true, explanation: 'Use HTTP for CRUD and sockets for live updates—common pattern for dashboards and collaboration.' },
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
          { id: 'rspack', label: 'Rspack / Rsbuild + CDN', correct: true, explanation: 'Rust-based bundlers speed up huge SPAs while keeping a Webpack-like plugin ecosystem.' },
          { id: 'parcel', label: 'Parcel + Static Host', correct: true, explanation: 'Parcel zero-config builds are fine for many SPAs paired with any CDN static host.' },
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
          { id: 'remix', label: 'Remix', correct: true, explanation: 'Remix is a full-stack React framework with nested routing, loaders, and web-standard forms—built for SSR.' },
          { id: 'jquery', label: 'jQuery', correct: false, explanation: 'jQuery is a DOM manipulation library. It has no server-side rendering capabilities whatsoever.' },
          { id: 'cra', label: 'Create React App (CSR only)', correct: false, explanation: 'CRA is a client-rendered SPA toolchain—no first-class SSR story compared to Next/Remix.' },
        ],
      },
      {
        id: 'ssr-2',
        question: 'Which rendering strategy?',
        options: [
          { id: 'ssr', label: 'Server-Side Rendering', correct: true, explanation: 'SSR generates HTML on each request. Best for dynamic, personalized content that needs SEO.' },
          { id: 'isr', label: 'Incremental Static Regeneration', correct: true, explanation: 'ISR combines static generation with on-demand revalidation. ' + (scale === 'high' ? 'Perfect for high-traffic sites with content updates.' : 'Good balance of performance and freshness.') },
          { id: 'streaming', label: 'Streaming SSR + Suspense', correct: true, explanation: 'Progressive HTML streaming improves TTFB and lets shells render while slow data resolves.' },
          { id: 'hybrid', label: 'Hybrid SSG + SSR per Route', correct: true, explanation: 'Marketing pages static, dashboards SSR—frameworks like Next support mixing strategies per segment.' },
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
          { id: 'deferawait', label: 'Defer Await / Parallel Loaders', correct: true, explanation: 'Fetching in parallel on the server avoids waterfalls and cuts time-to-first-byte for SSR pages.' },
          { id: 'prefetch', label: 'Server Prefetch + Hydrate Query Cache', correct: true, explanation: 'Prefetch on the server (TanStack Query, Relay) so the client hydrates with data already in cache.' },
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
          { id: 'swr', label: 'stale-while-revalidate Headers', correct: true, explanation: 'Let CDNs serve slightly stale HTML while refreshing in the background—great for read-heavy SSR.' },
          { id: 'tagged', label: 'Tagged / On-Demand Revalidation', correct: true, explanation: 'Framework cache tags (e.g. Next) let you invalidate specific pages when CMS content changes.' },
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
          { id: 'netlify', label: 'Netlify (SSR Adapters)', correct: true, explanation: 'Netlify runs server-rendered frameworks via adapters and edge functions—solid for many SSR stacks.' },
          { id: 'flyrender', label: 'Fly.io / Render (Node)', correct: true, explanation: 'Long-lived Node processes with TLS and autoscaling regions are a straightforward SSR deployment model.' },
          { id: 'statichost', label: 'Static File Host', correct: false, explanation: 'SSR requires a server to render pages. A static file host can\'t execute server-side code.' },
          { id: 'localdev', label: 'Local Dev Server', correct: false, explanation: 'A local development server is not production infrastructure. No uptime, no security, no scaling.' },
        ],
      },
    ],
  };

  return (questions[project] || []).map(q => ({
    ...q,
    options: padOptionsToEight(q.id, q.options),
  }));
}

export interface ScoreInput {
  /** Total clicks the user made on this question (incorrect + final correct). */
  attempts: number;
}

export interface ScoreResult {
  /** 1–10. Penalises the count of incorrect picks. */
  errorsScore: number;
  /** 1–10. Reflects how often clicks landed on a correct option (decision quality). */
  designScore: number;
  /** Weighted 50/50 average of the two factors, 1.0–10.0 (one decimal). */
  finalScore: number;
  rating: string;
  message: string;
  errorsExplanation: string;
  designExplanation: string;
  /** Total wrong clicks across the run (for display). */
  totalErrors: number;
  /** Total clicks across the run (for display). */
  totalClicks: number;
}

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

export function calculateScore(answers: ScoreInput[]): ScoreResult {
  const total = answers.length;

  if (total === 0) {
    return {
      errorsScore: 1,
      designScore: 1,
      finalScore: 1,
      rating: 'Beginner',
      message: 'No questions answered yet.',
      errorsExplanation: 'No data.',
      designExplanation: 'No data.',
      totalErrors: 0,
      totalClicks: 0,
    };
  }

  const totalErrors = answers.reduce((sum, a) => sum + Math.max(0, a.attempts - 1), 0);
  const totalCorrectClicks = total; // one correct click per completed question
  const totalClicks = answers.reduce((sum, a) => sum + a.attempts, 0);

  // Errors factor: 0 wrong picks → 10, average ≥ 1 wrong pick per question → 1.
  const errorsRatio = clamp(totalErrors / total, 0, 1);
  const errorsScore = clamp(Math.round(10 - 9 * errorsRatio), 1, 10);

  // Design factor: ratio of correct picks across ALL clicks → 1–10.
  const designRatio = totalClicks === 0 ? 0 : totalCorrectClicks / totalClicks;
  const designScore = clamp(Math.round(1 + 9 * designRatio), 1, 10);

  const finalScoreRaw = (errorsScore + designScore) / 2;
  const finalScore = Math.round(finalScoreRaw * 10) / 10;

  let rating: string;
  let message: string;
  if (finalScore >= 9) {
    rating = 'System Design Master';
    message = 'Outstanding. Few errors and consistently strong design choices — you can architect with confidence.';
  } else if (finalScore >= 7) {
    rating = 'Senior Architect';
    message = 'Strong performance. Most decisions were on point with only minor course corrections.';
  } else if (finalScore >= 5) {
    rating = 'Mid-Level Developer';
    message = 'A balanced result. Review the explanations on the questions you reconsidered to tighten up future decisions.';
  } else if (finalScore >= 3) {
    rating = 'Junior Developer';
    message = 'You are getting there. Focus on understanding why each option fits its scenario before committing.';
  } else {
    rating = 'Beginner';
    message = 'Plenty of room to grow. Re-read the tips and per-question explanations — they map to real industry trade-offs.';
  }

  const errorsExplanation =
    totalErrors === 0
      ? `Zero incorrect picks across ${total} question${total === 1 ? '' : 's'}.`
      : `${totalErrors} incorrect pick${totalErrors === 1 ? '' : 's'} across ${total} question${total === 1 ? '' : 's'}.`;

  const correctPct = Math.round(designRatio * 100);
  const designExplanation = `${totalCorrectClicks} of ${totalClicks} clicks landed on a correct option (${correctPct}%).`;

  return {
    errorsScore,
    designScore,
    finalScore,
    rating,
    message,
    errorsExplanation,
    designExplanation,
    totalErrors,
    totalClicks,
  };
}
