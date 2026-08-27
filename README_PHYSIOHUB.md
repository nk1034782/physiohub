PHYSIOHUB — README

This folder contains the PHYSIOHUB initial-build (mock data) added to the existing portfolio.

Preview locally:
  python -m http.server 8000
  open http://localhost:8000/physiohub/index.html

Deployment (Netlify):
 - Connect repository to Netlify (new site from Git)
 - Build command: (none for static HTML)
 - Publish directory: ./
 - Push the branch initial-build and open a PR to get a preview.

Supabase integration (next steps):
 - Create Supabase project and storage bucket 'uploads'
 - Run scripts/db-init.sql in the SQL editor
 - Add SUPABASE_URL and SUPABASE_ANON_KEY to Netlify env
 - Do NOT add service_role key to client-side code

This initial build uses mock JSON in /data/ and demo upload functionality only.
