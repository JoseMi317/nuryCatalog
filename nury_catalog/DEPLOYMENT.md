# Deployment

## Cloudflare Workers Static Assets

Recommended free hosting path for the public catalog while Supabase handles database and image storage.

Use these settings when importing the GitHub repository in Cloudflare:

- Repository: `JoseMi317/nuryCatalog`
- Production branch: `feat/mainPage` for this first publish
- Path: `/nury_catalog`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Non-production branch deploy command: `npx wrangler versions upload`

The Supabase publishable key is safe to expose in the browser. Do not commit secret keys.

No environment variables are required for the current build because the public Supabase URL and publishable key are already in the frontend environment file.

After the first deployment, Cloudflare will provide a `*.workers.dev` URL. Later, the production branch can be changed to `main` once the work is merged.
