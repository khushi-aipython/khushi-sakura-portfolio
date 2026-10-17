import './globals.scss';
import SiteNav from './components/SiteNav';
import SiteFooter from './components/SiteFooter';
import PortfolioAssistant from './components/PortfolioAssistant';
import RevealObserver from './components/RevealObserver';
import Script from 'next/script';

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
let metadataBase = {};
try {
  const parsedUrl = new URL(configuredUrl || '');
  if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') metadataBase = { metadataBase: parsedUrl };
} catch {
  // A domain is optional during local development; configure it before deployment.
}

export const metadata = {
  ...metadataBase,
  title: {
    default: 'Khushi — Full-Stack Developer',
    template: '%s | Khushi',
  },
  description: 'Khushi is a BCA (AI & IoT) student focused on full-stack web development, backend engineering, and growing AI/ML foundations.',
  applicationName: 'Khushi Portfolio',
  creator: 'Khushi',
  authors: [{ name: 'Khushi' }],
  keywords: [
    'Khushi', 'full-stack developer', 'backend development', 'Node.js', 'Express.js',
    'React', 'Next.js', 'MongoDB', 'JWT authentication', 'Python', 'AI/ML foundations',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    title: 'Khushi — Full-Stack Developer',
    description: 'Small builds. Bigger questions. Explore Khushi’s web development projects and learning journey.',
    type: 'website',
    siteName: 'Khushi Portfolio',
  },
};

const themeBootScript = `try { var savedTheme = localStorage.getItem('khushi-theme'); document.documentElement.dataset.theme = savedTheme === 'dark' ? 'dark' : 'light'; } catch (e) { document.documentElement.dataset.theme = 'light'; }`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="khushi-theme-boot" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <div className="scroll-progress" aria-hidden="true" />
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealObserver />
        <PortfolioAssistant />
      </body>
    </html>
  );
}
