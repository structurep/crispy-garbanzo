# Structured Partners Website Deployment Checklist

## Pre-Deployment Checks

- [ ] Run pre-deployment test script: `node scripts/pre-deployment-test.js`
- [ ] Ensure all environment variables are set in deployment platform:
  - [ ] `RESEND_API_KEY` for contact form functionality
  - [ ] `ANALYZE` (optional) for bundle analysis
- [ ] Verify all images and assets are properly referenced and available
- [ ] Test all interactive features in a staging environment
- [ ] Ensure forms submit correctly and data is processed
- [ ] Check responsive design on multiple device sizes
- [ ] Validate accessibility using built-in checker

## Deployment Steps

1. **Prepare Repository**
   - [ ] Commit all changes to version control
   - [ ] Push to main/production branch

2. **Deploy to Vercel**
   - [ ] Connect GitHub repository to Vercel
   - [ ] Configure environment variables in Vercel project settings
   - [ ] Deploy project
   - [ ] Verify deployment URL works correctly

3. **Post-Deployment Checks**
   - [ ] Test all navigation links
   - [ ] Verify all images load correctly
   - [ ] Test contact form submissions
   - [ ] Check Calendly integration
   - [ ] Verify dark mode functionality
   - [ ] Test animations and interactive elements
   - [ ] Check page load speed using Lighthouse

4. **SEO and Analytics**
   - [ ] Verify meta tags are correctly implemented
   - [ ] Check OpenGraph images appear correctly in social sharing
   - [ ] Set up analytics tracking
   - [ ] Submit sitemap to search engines
   - [ ] Verify schema.org markup using Google's Rich Results Test

5. **Final Checks**
   - [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
   - [ ] Test on mobile devices
   - [ ] Check for any console errors
   - [ ] Verify all third-party integrations work correctly

## Common Deployment Issues and Solutions

### Missing Environment Variables
- **Issue**: Forms or API routes fail due to missing environment variables
- **Solution**: Add all required environment variables in Vercel project settings

### Image Loading Issues
- **Issue**: Images fail to load in production
- **Solution**: Ensure image domains are properly configured in `next.config.mjs`

### API Routes Not Working
- **Issue**: API routes return 404 or 500 errors
- **Solution**: Check route handlers and ensure proper error handling

### CSS/Styling Issues
- **Issue**: Styles appear differently in production
- **Solution**: Verify CSS purging settings and check for any CSS-in-JS issues

### Performance Issues
- **Issue**: Slow page load times
- **Solution**: Optimize images, implement proper code splitting, and use Next.js performance features
\`\`\`

Let's also update the environment variables utility to ensure it's properly handling the required variables:
