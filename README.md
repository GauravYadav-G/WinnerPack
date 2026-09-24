# WinnerPack Technologies

The project contains a Next.js frontend (`winnerpack-frontend`) and an Express/MongoDB API (`winnerpack-backend`).

## Local development

Install dependencies with `npm ci` in each directory. Configure environment variables using each project's `.env.example`. Next.js loads `.env.local`; export the backend variables in your shell or configure them in your process runner before starting Express.

Start the backend with `npm run dev` in `winnerpack-backend`, then start the frontend with `npm run dev` in `winnerpack-frontend`. The default ports are 4000 and 3000. When `NEXT_PUBLIC_API_URL` is unset, Next.js proxies API requests to `http://localhost:4000`. Set it to the backend origin for a split deployment.

Admin login requires `ADMIN_PASSWORD`. Set a long random `SESSION_SECRET` to sign sessions, or the configured admin password will be used. Sessions expire after one day. Old unsigned login cookies are no longer accepted; sign in again after updating.

Run `npm run seed` in the backend to seed MongoDB, or `npm run db:seed` in the frontend. Review the seed script and target database before running it.

## Verification

- Frontend: `npm test`, `npm run typecheck`, and `npm run build`.
- Backend: `npm test` (also builds TypeScript).

Frontend production builds need access to Google Fonts. Tests use mocked delivery services and do not send emails or write to MongoDB.

Inquiry submissions use one same-origin request. The proxy first tries the backend, then falls back to email if the backend is unavailable. A successful database save counts as acceptance; it does not guarantee inbox delivery.

## Cleanup

Removed seven unreferenced components, an unused client revalidation helper, a standalone email demo, and an unreferenced 34 MB video in the admin source directory. Removed unused SMTP template and attachment code from the inquiry route, which sends JSON through FormSubmit. Public assets, uploads, fallback content, dependency lockfiles, and project tooling were retained because they may be used at runtime or during development.
