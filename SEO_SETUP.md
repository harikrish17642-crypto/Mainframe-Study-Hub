# 🔍 SEO Setup Checklist for MainframeStudyHub

All files are pre-built. Just follow these steps after deploying.

---

## ✅ Already Done (in code)

| Item | Status | File |
|------|--------|------|
| Meta title & description | ✅ | index.html |
| Open Graph tags (og:title, og:description, og:image, og:url) | ✅ | index.html |
| Twitter Card meta tags | ✅ | index.html |
| JSON-LD Structured Data (WebSite + EducationalOrg) | ✅ | index.html |
| Canonical URL | ✅ | index.html |
| Viewport meta (mobile-friendly) | ✅ | index.html |
| Apple mobile web app meta | ✅ | index.html |
| Theme color | ✅ | index.html |
| robots.txt | ✅ | /robots.txt |
| sitemap.xml | ✅ | /sitemap.xml |
| OG social share image (1200×630) | ✅ | /og-image.png |
| IndexNow key | ✅ | /080a9f3c9defa358efd4d33456a65730.txt |
| Netlify \_redirects (SPA routing) | ✅ | /\_redirects |

---

## 📋 Post-Deploy Steps (10 minutes total)

### 1️⃣ Google Search Console (5 min)
1. Go to **https://search.google.com/search-console**
2. Click **Add Property** → Enter your domain
3. Verify via: **HTML tag** method (add meta tag to index.html) OR **DNS** method
4. After verification → **Sitemaps** → Submit: `https://mainframestudyhub.com/sitemap.xml`
5. Click **Request Indexing** on your homepage URL

### 2️⃣ Bing Webmaster Tools (3 min)
1. Go to **https://www.bing.com/webmasters**
2. Sign in → **Add Site** → Enter domain
3. Verify (can import from Google Search Console!)
4. **Sitemaps** → Submit: `https://mainframestudyhub.com/sitemap.xml`

### 3️⃣ IndexNow — Instant Indexing (2 min)
After deploying, ping search engines by visiting this URL:

```
https://api.indexnow.org/indexnow?url=https://mainframestudyhub.com&key=080a9f3c9defa358efd4d33456a65730
```

Or use curl:
```bash
curl "https://api.indexnow.org/indexnow?url=https://mainframestudyhub.com&key=080a9f3c9defa358efd4d33456a65730"
```

This instantly notifies Bing, Yandex, and other IndexNow partners.

### 4️⃣ Update URLs (after getting domain)
After you buy your Netlify domain, update these files:

**index.html** — Replace all `https://mainframestudyhub.com` with your actual domain
**sitemap.xml** — Replace all URLs
**robots.txt** — Update Sitemap URL
**SUPABASE_SETUP.md** — Update redirect URLs in Supabase dashboard

---

## 🔗 Social Share Preview Test

After deploying, test how your links look when shared:

- **Facebook**: https://developers.facebook.com/tools/debug/
- **Twitter**: https://cards-dev.twitter.com/validator
- **LinkedIn**: https://www.linkedin.com/post-inspector/
- **General**: https://www.opengraph.xyz/

---

## 🌐 Netlify Custom Domain

You can buy a domain from Netlify **at any time** — before or after deployment.

1. Go to **Netlify Dashboard** → Your site → **Domain settings**
2. Click **Add custom domain** → Search for `mainframestudyhub.com`
3. Purchase → DNS is auto-configured by Netlify
4. HTTPS certificate is auto-provisioned (free via Let's Encrypt)
5. Update all URLs in code files, then redeploy

**Tip**: Even with a custom domain, your `.netlify.app` URL still works.
