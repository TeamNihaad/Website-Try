# Lexcrete — website + SaaS experience starter

A responsive public-facing website and interactive front-end prototype for Lexcrete, founded by Nihaad and Akshay.

## What's included

- Premium, modern dark-navy marketing website.
- Product pages/sections for contract intelligence, AI document control, project tracking and claims generation.
- Interactive sample workspace with Overview, Contracts, Correspondence, Project Timeline and Claims Studio tabs.
- Demo search, sample Q&A, sample claim-draft generation and upload-picker interaction.
- GitHub Pages deployment workflow and custom-domain file for `lexcrete.com`.

## Run locally

No build step or package installation is needed. Open `index.html` in a browser, or run a local static server:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Publish with GitHub Pages

1. Create a GitHub repository named `lexcrete` (or another name you prefer).
2. Upload the contents of this folder to the repository root.
3. In GitHub, open **Settings → Pages** and select **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. The included `CNAME` file is set to `lexcrete.com`. In your domain registrar's DNS settings, configure:
   - `A` records for `@` to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - `CNAME` record for `www` to `<your-github-username>.github.io`.
5. In GitHub Pages settings, set the custom domain to `lexcrete.com`, wait for DNS verification, then enable **Enforce HTTPS**.
6. Replace the placeholder contact email `contact@lexcrete.com` if you use a different inbox.

DNS changes can take time to propagate. Check GitHub's current Pages documentation for any updated requirements.

## Important: prototype vs production SaaS

The workspace is a front-end demonstration. It uses fictional sample data and local JavaScript interactions. It does **not** yet provide real user accounts, secure project storage, OCR/PDF ingestion, contract/letter extraction, vector search, AI model calls, audit trails, access control, reminders, or production claim analysis.

A production build should add a backend (for example, Next.js API routes or a separate service), PostgreSQL, private object storage, authentication, background document-processing jobs, OCR, a retrieval-augmented generation pipeline with page/paragraph citations, and role-based project permissions. Do not upload confidential project records to this static demo.

## Suggested production architecture

- Frontend: Next.js + TypeScript
- Authentication: managed auth with organisation/project roles
- Database: PostgreSQL
- File storage: private S3-compatible object storage
- Processing: OCR + document parsing + queued extraction/classification
- Search: PostgreSQL full-text + vector search
- AI: retrieval-grounded chat and drafting, with source citations and date-aware filters
- Audit: immutable activity log for uploads, classifications, edits and generated drafts

The first MVP should be restricted to two projects and EOT/Variation correspondence, as specified in the product brief. For drafting, enforce an as-of date cutoff so later letters or later claim submissions cannot leak into an earlier draft.
