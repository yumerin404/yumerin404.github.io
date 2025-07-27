export default defineEventHandler(async (event) => {
  const baseUrl = 'https://yumerin.org'
  
  const routes = [
    { loc: '', changefreq: 'daily', priority: '1.0' },
    { loc: '/ai', changefreq: 'weekly', priority: '0.8' },
    { loc: '/galgame', changefreq: 'weekly', priority: '0.8' },
    { loc: '/investment', changefreq: 'weekly', priority: '0.8' },
    { loc: '/learning', changefreq: 'weekly', priority: '0.8' },
    { loc: '/learning/posts', changefreq: 'weekly', priority: '0.7' },
    { loc: '/learning/quotes', changefreq: 'weekly', priority: '0.7' },
    { loc: '/medical', changefreq: 'weekly', priority: '0.8' },
    { loc: '/novels', changefreq: 'weekly', priority: '0.8' },
    { loc: '/politics', changefreq: 'weekly', priority: '0.8' },
    { loc: '/politics/thought', changefreq: 'weekly', priority: '0.7' },
    { loc: '/programming', changefreq: 'weekly', priority: '0.8' },
    { loc: '/writing', changefreq: 'weekly', priority: '0.8' },
    { loc: '/writing/insights', changefreq: 'weekly', priority: '0.7' },
    { loc: '/writing/story-anatomy', changefreq: 'weekly', priority: '0.7' }
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.loc}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`

  event.node.res.setHeader('Content-Type', 'application/xml')
  return sitemap
})