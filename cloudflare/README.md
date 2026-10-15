# Production deployment

The `wordcraftapp` Worker serves https://wordcraftapp.com and uses the D1 database
`wordcraftapp` through the `DB` binding. Public configuration is tracked in
`wrangler.production.json`; secrets stay in Cloudflare.

Cloudflare Workers Builds connects `zyrliuwei-sys/wordcraftapp`, production branch
`main`, with these commands:

- Build: `pnpm run cf:ci:build`
- Deploy: `pnpm exec wrangler d1 migrations apply wordcraftapp --remote --config wrangler.jsonc && pnpm exec wrangler deploy`

The build recreates the ignored `wrangler.jsonc` and `.env.production` files.
It sets the production URL before Vite compiles the application. Pushing to
`main` starts a new build and production deployment; local edits take effect
after they have been committed and pushed.

Builds watch all repository paths (`*`), so changes to pages, translations,
assets, configuration, and reviewed migrations all trigger deployment.

`AUTH_SECRET` and `CONFIG_ENCRYPTION_KEY` are Worker secrets and must be kept
stable. Provider credentials can be managed at `/admin/settings`.

## Database changes

`cloudflare/migrations/` contains the reviewed, committed D1 migrations. The
initial two migrations were already applied to production before this setup.
Wrangler records applied filenames and skips them on subsequent deployments.

For future schema changes, generate migrations with `pnpm db:generate`, review
the SQL, then copy the new SQL files from `drizzle/` into
`cloudflare/migrations/` before committing. Keep their filenames unchanged.
Production migrations require review before being pushed to `main`, because
the deployment command applies pending migrations before deploying the Worker.
Keep database changes compatible with the currently deployed version.

## Manual deployment

After authenticating Wrangler:

```sh
node scripts/prepare-cloudflare-ci.mjs
pnpm exec wrangler d1 migrations apply wordcraftapp --remote --config wrangler.jsonc
pnpm run cf:deploy
```

Build history and logs are available in Cloudflare under Workers & Pages →
wordcraftapp → Deployments.
