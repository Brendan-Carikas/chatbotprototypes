# Firebase Deployment Guide for IDS Project

This guide provides step-by-step instructions for deploying applications to Firebase hosting sites within the IDS project.

## Prerequisites

- Firebase CLI installed (`npm install -g firebase-tools`)
- Node.js and npm installed
- A React application ready for deployment

## 1. Authentication

First, ensure you're logged into Firebase:

```bash
firebase login
```

## 2. Project Management

### Checking Available Projects

List all Firebase projects you have access to:

```bash
firebase projects:list
```

### Switching to the IDS Project

If you're not already using the IDS project, switch to it:

```bash
firebase use ids-project-597cc
```

### Setting Up Project Aliases (Optional)

For easier project switching, set up aliases:

```bash
# Add the IDS project with an alias
firebase use --add ids-project-597cc ids

# Switch using the alias
firebase use ids
```

## 3. Hosting Site Management

### Checking Hosting Sites in the IDS Project

List all hosting sites within the current project:

```bash
firebase hosting:sites:list
```

Example output:
```
Sites for project ids-project-597cc

┌───────────────────┬───────────────────────────────────┬─────────────────┐
│ Site ID           │ Default URL                       │ App ID (if set) │
├───────────────────┼───────────────────────────────────┼─────────────────┤
│ artochat-app      │ https://artochat-app.web.app      │ --              │
├───────────────────┼───────────────────────────────────┼─────────────────┤
│ ids-project-597cc │ https://ids-project-597cc.web.app │ --              │
└───────────────────┴───────────────────────────────────┴─────────────────┘
```

### Creating a New Hosting Site (If Needed)

To create a new hosting site within the project:

```bash
firebase hosting:sites:create SITE_ID
```

Replace `SITE_ID` with your desired site name (must be unique).

## 4. Deploying to Specific Apps Within the IDS Project

### Method 1: Using Targets (Recommended)

1. **Create a Target for the Specific Site**

   ```bash
   firebase target:apply hosting TARGET_NAME SITE_ID
   ```

   Example:
   ```bash
   firebase target:apply hosting chatbot artochat-app
   ```

   This creates a target named `chatbot` that points to the `artochat-app` site.

2. **Update firebase.json**

   Edit your firebase.json file to include the target:

   ```json
   {
     "hosting": {
       "target": "chatbot",
       "public": "dist",
       "ignore": [
         "firebase.json",
         "**/.*",
         "**/node_modules/**"
       ],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

3. **Build Your Application**

   For React applications using Vite:

   ```bash
   npm run build
   ```

   Ensure your vite.config.ts has the correct base path:

   ```typescript
   export default defineConfig({
     base: '/',
     // other config options...
   });
   ```

4. **Deploy to the Specific Target**

   ```bash
   firebase deploy --only hosting:chatbot
   ```

### Method 2: Multiple Sites in firebase.json

For managing multiple sites in a single project:

```json
{
  "hosting": [
    {
      "target": "app1",
      "public": "dist",
      "rewrites": [
        {
          "source": "**",
          "destination": "/index.html"
        }
      ]
    },
    {
      "target": "app2",
      "public": "other-app/dist",
      "rewrites": [
        {
          "source": "**",
          "destination": "/index.html"
        }
      ]
    }
  ]
}
```

Then set up targets:

```bash
firebase target:apply hosting app1 site-one
firebase target:apply hosting app2 site-two
```

And deploy:

```bash
firebase deploy --only hosting:app1,hosting:app2
```

## 5. Troubleshooting

### White Screen After Deployment

If you see a white screen with console errors about MIME types:

1. Check your Vite configuration (vite.config.ts):
   ```typescript
   export default defineConfig({
     base: '/', // Should be '/' for root deployment
     // other config options...
   });
   ```

2. Rebuild and redeploy:
   ```bash
   npm run build
   firebase deploy --only hosting:TARGET_NAME
   ```

### Authentication Issues

If you encounter authentication issues:

```bash
firebase logout
firebase login
```

### Deployment Conflicts

If you have conflicts between projects:

```bash
# Clear project cache
firebase use --clear

# Then set the project again
firebase use ids-project-597cc
```

## 6. Accessing Deployed Applications

After successful deployment, your applications will be available at:

- https://SITE_ID.web.app
- https://SITE_ID.firebaseapp.com

For example:
- https://artochat-app.web.app
- https://ids-project-597cc.web.app

## 7. Additional Resources

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [Managing Multiple Sites](https://firebase.google.com/docs/hosting/multisites)
