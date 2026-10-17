export const projects = [
  {
    id: 'hunter-auth', number: '01', category: 'backend', status: 'Built', title: 'Hunter Auth', eyebrow: 'BACKEND / IDENTITY', question: 'What really happens between a login form and an authenticated request?',
    short: 'A backend-focused build for understanding signup, login, password hashing, and token-based identity.',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'MVC', 'bcrypt', 'JWT', 'Postman'],
    approach: ['Structured the request flow around routes and MVC-style controllers.', 'Implemented signup and login flows with password hashing using bcrypt.', 'Practised token-based authentication using JSON Web Tokens (JWT).', 'Used Postman to inspect requests and responses while developing.'],
    challenge: 'Understanding where each responsibility belongs: the route, controller, credential storage, and token-based identity. That separation made the backend flow easier to reason about.',
    next: 'Add automated tests, robust input validation, refresh-token strategy, and clearer error handling before treating the project as production-ready.',
    href: 'https://github.com/khushi-aipython/Hunter-Auth', linkLabel: 'View Hunter Auth repository', visual: 'auth', tags: ['backend', 'web'],
  },
  {
    id: 'hunter-weather', number: '02', category: 'web', status: 'Built', title: 'Hunter Weather', eyebrow: 'WEB / API INTEGRATION', question: 'How does live data become a useful interface?',
    short: 'A weather interface that turns a REST API response into readable, at-a-glance conditions.',
    stack: ['HTML', 'CSS', 'JavaScript', 'REST API', 'async/await', 'JSON'],
    approach: ['Requested weather data from the OpenWeather REST API.', 'Mapped temperature, feels-like temperature, humidity, wind speed, and weather icons into the interface.', 'Handled asynchronous requests with loading and error states.'],
    challenge: 'The API is outside the interface, so network delays, invalid locations, and failed requests need their own UI states instead of leaving users guessing.',
    next: 'Add automated tests for edge cases, more explicit empty states, and a polished small-screen weather summary.',
    href: 'https://github.com/khushi-aipython/Hunter-Weather', linkLabel: 'View Hunter Weather repository', visual: 'weather', tags: ['web'],
  },
  {
    id: 'tic-tac-toe', number: '03', category: 'web', status: 'Built', title: 'Tic Tac Toe', eyebrow: 'JAVASCRIPT / GAME LOGIC', question: 'Can game rules stay separate from the board UI?',
    short: 'A small game that became practice in state, win patterns, draw handling, and edge cases.',
    stack: ['HTML', 'CSS', 'JavaScript', 'DOM', 'Arrays', 'State logic'],
    approach: ['Represented the nine cells as a board-state array.', 'Used data-cell attributes rather than depending on button order.', 'Kept the current player and game-over state separate.', 'Checked eight winning patterns and designed a reset flow.'],
    challenge: 'Repeated clicks, clicks after a win, and all possible winning lines force the rules to be defined deliberately—not just styled until the demo looks right.',
    next: 'Separate game rules from DOM updates and add small test cases for every winning pattern, a draw, and invalid moves.',
    href: 'https://github.com/khushi-aipython/Tic-Tac-Toe', linkLabel: 'View Tic Tac Toe repository', visual: 'game', tags: ['web'],
  },
  {
    id: 'sakura-portfolio', number: '04', category: 'web', status: 'In progress', title: 'Sakura Developer Portfolio', eyebrow: 'NEXT.JS / CREATIVE ENGINEERING', question: 'How can a portfolio feel personal without sacrificing speed or clarity?',
    short: 'A multi-page portfolio experiment mixing editorial layout, accessible flip cards, lazy loading, and a custom GLSL scene.',
    stack: ['Next.js', 'React', 'SCSS', 'Three.js', 'GLSL', 'Lazy loading'],
    approach: ['Organized the experience as separate routes for Home, About, Projects, Certifications, and Contact.', 'Used SCSS tokens and responsive layouts to keep the sakura palette restrained.', 'Built a custom Three.js ShaderMaterial scene and dynamically load it on the client.', 'Added project and certificate flip cards, scroll reveals, reduced-motion support, and lazy certificate previews.'],
    challenge: 'Balancing a high-personality visual design with performance, keyboard access, mobile navigation, and a site that still feels calm rather than over-animated.',
    next: 'Run a production build, audit focus/contrast across pages, and deploy the finished site once the public repository and domain are chosen.',
    href: null, linkLabel: null, visual: 'portfolio', tags: ['web', 'inprogress'],
  },
  {
    id: 'url-shortener', number: '05', category: 'backend', status: 'Built', title: 'URL Shortener', eyebrow: 'BACKEND / MVC PRACTICE', question: 'How should routes, controllers, views, and stored data fit together?',
    short: 'A backend application for practising URL-shortening workflows and separation of concerns.',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'EJS', 'MVC', 'Routing'],
    approach: ['Organized route handling and controller responsibilities around an MVC-style structure.', 'Practised rendering EJS views and using MongoDB-backed application data.', 'Used the project to explore API design and maintainable backend boundaries.'],
    challenge: 'Keeping request routing, business logic, and data access from becoming tangled as the number of routes grows.',
    next: 'Add validation, duplicate/expiry behavior, redirect tests, analytics, and link the exact repository once it is confirmed.',
    href: 'https://github.com/khushi-aipython?tab=repositories', linkLabel: 'Find repository on GitHub', visual: 'link', tags: ['backend'],
  },
  {
    id: 'knn-from-scratch', number: '06', category: 'aiml', status: 'Built', title: 'KNN From Scratch', eyebrow: 'PYTHON / ML FOUNDATIONS', question: 'What is a model actually doing before a library hides the steps?',
    short: 'A first-principles K-Nearest Neighbors implementation focused on distance and neighbor selection.',
    stack: ['Python', 'Distance formula', 'Classification logic', 'Algorithmic reasoning'],
    approach: ['Implemented distance calculation rather than delegating the core logic to scikit-learn.', 'Selected nearest points and reasoned through how their labels influence a prediction.', 'Used the build to strengthen Python and model fundamentals.'],
    challenge: 'A model only feels understandable when each intermediate step—distance, sorting, neighbor choice, voting—can be explained.',
    next: 'Add test datasets, compare choices of k, evaluate edge cases, and document time/space complexity.',
    href: 'https://github.com/khushi-aipython?tab=repositories', linkLabel: 'Find repository on GitHub', visual: 'knn', tags: ['aiml'],
  },
  {
    id: 'gpa-analyzer', number: '07', category: 'aiml', status: 'In progress', title: 'GPA AI Analyzer', eyebrow: 'AI / ML · ACTIVE BUILD', question: 'Can academic data become a transparent, useful prediction workflow?',
    short: 'A developing project exploring academic-data preparation, feature analysis, and GPA prediction.',
    stack: ['Python', 'NumPy', 'Pandas', 'Linear Regression', 'Data preparation'],
    approach: ['Planning the dataset and feature pipeline before leaning on high-level abstractions.', 'Exploring data preparation and feature analysis with NumPy and Pandas.', 'Learning to evaluate predictions and explain model behavior.'],
    challenge: 'Building a dataset that is consistent enough to learn from, and avoiding the assumption that a prediction is automatically meaningful.',
    next: 'Finish the first end-to-end data pipeline, establish a baseline, evaluate it on held-out data, and publish the repository when ready.',
    href: null, linkLabel: null, visual: 'gpa', tags: ['aiml', 'inprogress'],
  },
  {
    id: 'collaborative-editor', number: '08', category: 'web', status: 'In progress', title: 'Collaborative Code Editor', eyebrow: 'FULL-STACK / REAL-TIME · ACTIVE BUILD', question: 'How can multiple signed-in users edit the same code without overwriting each other?',
    short: 'An in-progress idea for a shared code editor using real-time collaboration and a containerized deployment path.',
    stack: ['Yjs (planned)', 'Node.js (planned)', 'Docker (planned)', 'AWS (planned)', 'Multi-user auth'],
    approach: ['Designing around multiple user sessions and shared editing state.', 'Investigating Yjs for conflict-aware collaborative document updates.', 'Planning a Docker-based development setup and an AWS deployment path.'],
    challenge: 'Real-time collaboration needs a clear synchronization model, identity/session handling, and a reliable way to recover when clients reconnect.',
    next: 'Build a small shared-text proof of concept first, test concurrent edits, then add authentication and containerized deployment in stages.',
    href: null, linkLabel: null, visual: 'collab', tags: ['web', 'inprogress'],
  },
];

export const certificates = [
  {
    id: 'codtech', number: '01', title: 'Python Programming Internship', issuer: 'CODTECH IT Solutions Pvt. Ltd.', detail: 'Four-week internship experience certificate', date: '03 Jan – 31 Jan 2026',
    image: '/certificates/thumbs/codtech-python-internship.webp', pdf: '/certificates/codtech-python-internship.pdf', category: 'Internship',
  },
  {
    id: 'gen-ai-mastermind', number: '02', title: 'Gen AI Engineering Mastermind', issuer: 'Outskill', detail: 'Completed the Gen AI Engineering Mastermind program.',
    image: '/certificates/thumbs/gen-ai-engineering-mastermind.webp', pdf: '/certificates/gen-ai-engineering-mastermind.pdf', category: 'AI / Learning',
  },
  {
    id: 'udemy-python', number: '03', title: 'Complete Python Programming for Beginners — 2026', issuer: 'Udemy · Instructor: Hemanth Kumar', detail: '11-hour course completion certificate', date: '24 Jan 2026',
    image: '/certificates/thumbs/udemy-python-beginners-2026.webp', pdf: '/certificates/udemy-python-beginners-2026.pdf', category: 'Python',
  },
  {
    id: 'ai-for-bharat', number: '04', title: 'AI for Bharat Hackathon', issuer: 'AWS · Hack2Skill', detail: 'Certificate of participation for a qualified prototype submission', date: 'Issue date printed on certificate',
    image: '/certificates/thumbs/ai-for-bharat-hackathon.webp', pdf: '/certificates/ai-for-bharat-hackathon.pdf', category: 'Hackathon',
  },
  {
    id: 'wscube-ethical-hacker', number: '05', title: 'How to Become a Certified Ethical Hacker in 2026', issuer: 'WsCube Tech', detail: 'Certificate of completion', date: '09 Oct 2026',
    image: '/certificates/thumbs/wscube-ethical-hacker-2026.webp', pdf: '/certificates/wscube-ethical-hacker-2026.pdf', category: 'Cybersecurity',
  },
];

export const skills = [
  { title: 'Frontend & Web UI', accent: 'lavender', items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'SCSS', 'Responsive UI', 'API integration'] },
  { title: 'Backend & Identity', accent: 'rose', items: ['Node.js', 'Express.js', 'REST APIs', 'MVC', 'MongoDB', 'MySQL', 'Authentication', 'Authorization (current focus)', 'JWT', 'bcrypt'] },
  { title: 'Cloud & Developer Workflow', accent: 'sage', items: ['Git', 'GitHub', 'Postman', 'AWS fundamentals', 'Docker fundamentals'] },
  { title: 'Programming & AI/ML Foundations', accent: 'peach', items: ['Python', 'C/C++', 'NumPy', 'Pandas', 'KNN', 'Linear Regression', 'Data preparation'] },
];
