const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;
const requestsByIp = new Map();

const assistantInstructions = `You are Sakura, the friendly portfolio assistant for Khushi, a BCA (AI & IoT) student graduating in 2027. Be concise, warm, and useful to recruiters. Only state facts contained in this portfolio context. Never invent qualifications, dates, metrics, deployment status, work experience, or completed features. Her primary direction is full-stack web development/backend, with AI/ML as a developing foundation. Authorization is a current learning focus; AWS and Docker are fundamentals. The collaborative code editor and GPA AI Analyzer are in progress, not completed. If a question is outside the portfolio, say you are designed to help visitors explore the portfolio and suggest projects, skills, certificates, learning, or contact. Do not request private information or API keys.

Portfolio facts:
- GitHub: https://github.com/khushi-aipython
- LinkedIn: https://www.linkedin.com/in/khushi-aipython/
- Email: khushiaipython@gmail.com
- Projects: Hunter Auth (Node.js, Express, MongoDB, bcrypt, JWT), Hunter Weather (JavaScript, OpenWeather REST API), Tic Tac Toe (HTML, CSS, JavaScript and game logic), URL Shortener (Node.js, Express, MongoDB, EJS, MVC practice), KNN From Scratch (Python), Sakura Portfolio (Next.js, React, SCSS, Three.js, GLSL), GPA AI Analyzer (in progress), Collaborative Code Editor using planned Yjs, auth, Docker and AWS (in progress).
- Skills: JavaScript, React, Next.js, SCSS, Node.js, Express, MVC, REST APIs, MongoDB, MySQL, authentication, authorization concepts, JWT, bcrypt, Python, C/C++, NumPy, Pandas, KNN and linear regression foundations, Git, GitHub, Postman. AWS and Docker: fundamentals.
- Education: BCA (AI & IoT), ICFAI University, Jaipur, expected 2027, CGPA 8.00/10.
- Certificates on the portfolio: CODTECH Python Programming Internship; Gen AI Engineering Mastermind; Complete Python Programming for Beginners — 2026 (Udemy); AI for Bharat Hackathon; How to Become a Certified Ethical Hacker in 2026 (WsCube Tech).`;

function localReply(message) {
  const q = message.toLowerCase();
  if (/contact|email|hire|reach|linkedin|resume|cv|connect|job|role|opportunit/.test(q)) {
    return { reply: 'You can contact Khushi at khushiaipython@gmail.com, or visit her LinkedIn and GitHub profiles. For a recruiter, the Contact page keeps those links together.', actions: [{ label: 'Contact page', href: '/contact' }, { label: 'LinkedIn', href: 'https://www.linkedin.com/in/khushi-aipython/' }, { label: 'GitHub', href: 'https://github.com/khushi-aipython' }] };
  }
  if (/certif|certificate|credential|course|internship|hackathon/.test(q)) {
    return { reply: 'The portfolio includes certificates for the CODTECH Python internship, Gen AI Engineering Mastermind, Udemy Python for Beginners, AI for Bharat Hackathon, and WsCube Tech Ethical Hacking. Open a card to preview the document or view the original PDF.', actions: [{ label: 'View certifications', href: '/certifications' }] };
  }
  if (/auth|jwt|bcrypt|password|login|backend|authori[sz]|node|express|mongo|api/.test(q)) {
    return { reply: 'Hunter Auth is the clearest backend project: it explores signup/login workflows, password hashing with bcrypt, JWT-based authentication, and an MVC-oriented Node.js/Express structure. Authorization is a current learning focus, so I describe it as developing knowledge rather than claiming mastery.', actions: [{ label: 'Project stories', href: '/projects#hunter-auth' }, { label: 'About Khushi', href: '/about' }] };
  }
  if (/weather|openweather|tic.?tac|game|knn|url short|shortener/.test(q)) {
    return { reply: 'Khushi’s project collection includes Hunter Weather (REST API integration and async UI states), Tic Tac Toe (board state and win patterns), URL Shortener (MVC/backend practice), and KNN From Scratch (ML fundamentals). Each project card explains its approach, challenge, and next improvement.', actions: [{ label: 'Explore projects', href: '/projects' }] };
  }
  if (/skill|stack|technology|tech stack|learn|learning|focus|docker|aws|yjs|three|glsl|scss|react/.test(q)) {
    return { reply: 'Khushi’s main focus is full-stack/backend development: JavaScript, React, Next.js, Node.js, Express, REST APIs, MongoDB, MVC, authentication, JWT and bcrypt. She is strengthening authorization concepts. Python and AI/ML remain foundation areas; AWS and Docker are currently at the fundamentals stage.', actions: [{ label: 'View skills & story', href: '/about' }, { label: 'Explore projects', href: '/projects' }] };
  }
  if (/gpa|analy[sz]er|collaborat|code editor|in progress|ongoing|current project/.test(q)) {
    return { reply: 'Two projects are marked in progress: GPA AI Analyzer, exploring academic-data preparation and prediction, and a Collaborative Code Editor concept using Yjs for shared editing with authentication and a planned Docker/AWS path. They are labelled honestly as active builds, not completed deployments.', actions: [{ label: 'See in-progress projects', href: '/projects' }] };
  }
  if (/about|education|college|university|cgpa|degree|experience|who is khushi/.test(q)) {
    return { reply: 'Khushi is a BCA (AI & IoT) student at ICFAI University, Jaipur, expected to graduate in 2027. Her portfolio emphasizes hands-on web builds, learning backend fundamentals by implementing them, and growing AI/ML foundations.', actions: [{ label: 'Read the About page', href: '/about' }] };
  }
  if (/project|github|repo|repository|build|work/.test(q)) {
    return { reply: 'Start with Hunter Auth for backend and identity concepts, Hunter Weather for REST API integration, and Tic Tac Toe for JavaScript state/logic. The Projects page also includes the URL Shortener, KNN From Scratch, the portfolio itself, and two in-progress builds.', actions: [{ label: 'View all projects', href: '/projects' }] };
  }
  return { reply: 'I can help you explore Khushi’s projects, backend skills, certifications, education, current learning, or contact links. Try one of the topics below, or ask about Hunter Auth, Hunter Weather, or the in-progress collaborative editor.', actions: [{ label: 'Projects', href: '/projects' }, { label: 'Skills & background', href: '/about' }, { label: 'Certifications', href: '/certifications' }, { label: 'Contact', href: '/contact' }] };
}

function allowedByRateLimit(ip) {
  const now = Date.now();
  const previous = requestsByIp.get(ip);
  if (requestsByIp.size > 500) {
    for (const [key, record] of requestsByIp.entries()) {
      if (now - record.start >= WINDOW_MS) requestsByIp.delete(key);
    }
  }
  if (!previous || now - previous.start >= WINDOW_MS) {
    requestsByIp.set(ip, { start: now, count: 1 });
    return true;
  }
  if (previous.count >= MAX_REQUESTS) return false;
  previous.count += 1;
  return true;
}

function actionLinksFor(message) {
  const q = message.toLowerCase();
  if (/contact|email|hire|reach|linkedin|resume|cv/.test(q)) return [{ label: 'Contact', href: '/contact' }];
  if (/certif|certificate|credential/.test(q)) return [{ label: 'Certifications', href: '/certifications' }];
  if (/skill|stack|learn|learning|education|about|background/.test(q)) return [{ label: 'About & skills', href: '/about' }];
  return [{ label: 'Project stories', href: '/projects' }];
}

export async function POST(request) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 12_000) return Response.json({ error: 'Message is too large.' }, { status: 413 });

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'Please send a valid chat message.' }, { status: 400 });
  }

  const message = typeof payload?.message === 'string' ? payload.message.trim().slice(0, 500) : '';
  if (!message) return Response.json({ error: 'Please enter a message.' }, { status: 400 });

  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const ip = forwarded || 'unknown';
  if (!allowedByRateLimit(ip)) {
    return Response.json({ reply: 'You’ve sent several messages very quickly. Please wait a minute and try again.', actions: actionLinksFor(message), mode: 'portfolio' }, { status: 429 });
  }

  const local = localReply(message);
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return Response.json({ ...local, mode: 'portfolio' });

  try {
    const safeHistory = Array.isArray(payload.history)
      ? payload.history.slice(-6).filter((item) => ['user', 'assistant'].includes(item?.role) && typeof item?.content === 'string')
        .map((item) => `${item.role === 'user' ? 'Visitor' : 'Sakura'}: ${item.content.slice(0, 500)}`).join('\n')
      : '';
    const input = `${safeHistory ? `${safeHistory}\n` : ''}Visitor: ${message}`;
    const apiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
        instructions: assistantInstructions,
        input,
        max_output_tokens: 260,
        store: false,
      }),
      signal: AbortSignal.timeout(12_000),
    });
    if (!apiResponse.ok) throw new Error('AI provider request failed');
    const data = await apiResponse.json();
    const reply = (data.output || []).flatMap((item) => item.content || [])
      .filter((item) => item.type === 'output_text' && typeof item.text === 'string')
      .map((item) => item.text).join('\n').trim();
    if (!reply) throw new Error('AI provider returned no text');
    return Response.json({ reply: reply.slice(0, 1600), actions: actionLinksFor(message), mode: 'ai' });
  } catch {
    return Response.json({ ...local, mode: 'portfolio' });
  }
}
