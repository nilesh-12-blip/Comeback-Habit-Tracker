# Deployment Guide

## 🚀 Deployment Options

This is a static React application built with Vite. It can be deployed to various platforms with minimal configuration.

## Option 1: Netlify (Recommended - Free & Easy)

### Manual Deployment
1. Visit [netlify.com](https://netlify.com) and sign up
2. Create a new site from Git or drag & drop your `dist/` folder
3. Run `npm run build` locally
4. Drag the `dist/` folder into Netlify
5. Your site will be live instantly!

### Automatic Deployment (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Netlify will auto-deploy on every push!

## Option 2: Vercel

1. Visit [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect Vite
4. Click Deploy
5. Your site is live!

## Option 3: GitHub Pages

```bash
# Install gh-pages package
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

## Option 4: Self-Hosted (VPS/Server)

1. Build the project:
```bash
npm run build
```

2. Upload the `dist/` folder to your server

3. Serve with Nginx:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    root /var/www/comeback-tracker/dist;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

4. Use SSL certificate (Let's Encrypt):
```bash
sudo certbot --nginx -d yourdomain.com
```

## Environment Configuration

Create a `.env` file for environment variables:

```
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=Comeback Habit Tracker
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Performance Optimization

### Current Optimizations
- ✅ Minified production build
- ✅ CSS-in-JS for minimal CSS files
- ✅ No external dependencies (React + React-DOM only)
- ✅ LocalStorage for offline data
- ✅ Lazy component loading ready

### Further Optimizations (Future)
```bash
# Code splitting
npm install react-lazy-load-image-component

# Image optimization
npm install imagemin imagemin-webp

# Bundler analysis
npm install --save-dev rollup-plugin-visualizer
```

## SEO Configuration

Add meta tags to `index.html`:

```html
<meta name="description" content="Track habits, build discipline, achieve personal growth" />
<meta property="og:title" content="Comeback Habit Tracker" />
<meta property="og:description" content="Your personal growth platform" />
<meta property="og:image" content="/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
```

## Custom Domain

1. Register domain (GoDaddy, Namecheap, etc.)
2. Update DNS records to point to your hosting
3. Set up SSL certificate
4. Update your hosted URL in app configs

## Monitoring & Analytics

### Option 1: Google Analytics
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Option 2: Plausible Analytics
Simple privacy-focused analytics

## Continuous Integration/Deployment

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Testing Before Deployment

```bash
# Build and preview locally
npm run build
npm run preview

# Visit http://localhost:4173
```

## Troubleshooting

### Build fails
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### App not loading
- Check console for errors
- Verify all assets are in `dist/`
- Check routing configuration

### Performance issues
- Use Chrome DevTools Network tab
- Check bundle size with `npm run build -- --analyze`
- Minimize external requests

## Version 2 Deployment (With Backend)

When adding backend:

```bash
# Build API separately
VITE_API_URL=https://api.yourdomain.com npm run build

# Deploy frontend and backend independently
```

## Security Checklist

- ✅ HTTPS enabled (always use HTTPS)
- ✅ Content Security Policy headers
- ✅ No sensitive data in localStorage
- ✅ Regular dependency updates
- ✅ Remove console.log statements in production

```javascript
// Remove dev logs in production
if (!import.meta.env.PROD) {
  console.log('dev message');
}
```

## Rollback Plan

Keep previous builds backed up:
```bash
# Tag releases
git tag -a v1.0.0 -m "Release 1.0.0"
git push origin v1.0.0

# Deploy specific version
npm run build
# Keep dist/ folder before pushing new version
```

---

**Happy deploying!** 🚀
