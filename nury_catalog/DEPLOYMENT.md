# Deployment

## Cloudflare Pages

Recommended free hosting path for the public catalog while Supabase handles database and image storage.

Use these settings when importing the GitHub repository in Cloudflare Pages:

- Framework preset: Angular
- Repository: `JoseMi317/nuryCatalog`
- Production branch: `feat/mainPage` for this first publish
- Root directory: `nury_catalog`
- Build command: `npm run build`
- Build output directory: `dist/nury_catalog/browser`

The Supabase publishable key is safe to expose in the browser. Do not commit secret keys.

After the first deployment, Cloudflare will provide a `*.pages.dev` URL. Later, the production branch can be changed to `main` once the work is merged.
