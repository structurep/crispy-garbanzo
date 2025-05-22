# Deployment Configuration Guide

This document outlines the steps to properly deploy the Structured Partners website to Vercel.

## Environment Variables

The following environment variables must be set in your Vercel project settings:

| Variable | Description | Required |
|----------|-------------|----------|
| RESEND_API_KEY | API key for Resend email service | Yes |
| ANALYZE | Enable bundle analysis during build (set to "true") | No |
| CONTACT_EMAIL | Email address to receive contact form submissions | Yes |

## Deployment Steps

1. **Set up environment variables in Vercel:**
   - Go to your Vercel project dashboard
   - Navigate to Settings > Environment Variables
   - Add all required environment variables
   - Make sure to set different values for Production, Preview, and Development environments if needed

2. **Configure preview deployments:**
   - In your Vercel project, go to Settings > Git
   - Enable "Preview Deployments" for pull requests
   - Consider setting up a custom domain for preview deployments

3. **Enable Vercel Analytics:**
   - Go to your Vercel project dashboard
   - Navigate to Analytics
   - Click "Enable Analytics"
   - Choose the appropriate plan for your needs

4. **Configure build settings:**
   - Go to Settings > General
   - Set the appropriate Node.js version (16.x or higher)
   - Set the build command to `next build`
   - Set the output directory to `.next`

5. **Set up custom domains:**
   - Go to Settings > Domains
   - Add your custom domain(s)
   - Follow the instructions to verify domain ownership

## Post-Deployment Checks

After deploying, verify the following:

1. Test the contact form to ensure emails are being sent correctly
2. Check that all pages load properly and images are displayed
3. Test the website on different devices and browsers
4. Verify that dark mode works correctly
5. Check that all links work properly

## Troubleshooting

If you encounter issues during deployment:

1. Check the build logs for errors
2. Verify that all environment variables are set correctly
3. Try deploying from a clean branch
4. Contact Vercel support if issues persist

### 3.2 Create a Skip Link for Accessibility
Add a skip link near the top of the page so keyboard and screen reader users can bypass
the navigation. Include a link that jumps to `#main-content` and becomes visible when
focused. This project provides a `SkipLink` component that you can add in
`app/layout.tsx` before the main content wrapper.
