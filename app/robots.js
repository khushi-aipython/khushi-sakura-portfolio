function publicOrigin() {
  try {
    const parsed = new URL(process.env.NEXT_PUBLIC_SITE_URL || '');
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.origin : null;
  } catch {
    return null;
  }
}

export default function robots() {
  const siteUrl = publicOrigin();
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    ...(siteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
