---
name: ship
description: Check that BioIntern Radar is ready, then commit and, with the user's explicit go-ahead, push so the public site redeploys. Use when the user says to ship, publish, release, deploy, push or "make it live".
---

# Ship

Pushing to the GitHub repository's main branch redeploys the public Cloudflare site (static files, configured in `wrangler.jsonc`). So a push is a public deployment, and `AGENTS.md` requires asking before one. An earlier yes does not cover a later push.

Live site URL: _not set yet. Replace this line with the address once the first Cloudflare deployment has finished._

## 1. Checks that must pass

```sh
export PATH="$HOME/.nvm/versions/node/v24.16.0/bin:$PATH"
npm run format:check
npm test
npm run build
npm audit --omit=dev --audit-level=high
npm run status:report
```

- If anything fails, stop and report the output. Do not ship around a failure.
- If the status report shows `URGENT` records, or a deadline has passed since the last check, say so and offer the `refresh-statuses` skill first. The public site must not advertise a closed call as open.

## 2. Look at it

Scale this to the change. For anything visible, check the affected pages in the browser in light and dark, at a phone width and a desktop width, with no console errors. For a larger change, follow the "Verification" section of `AGENTS.md`: home, catalogue, a detail page, Saved, an unknown URL, at 320, 390, 768 and 1440px. For a change to headers, scripts or styles, also run the `biointern-preview` launch configuration, which serves the production build with the real security headers, and confirm there are no content-security-policy errors.

## 3. Review what is going out

- Run `git status` and `git diff --stat`. Read the diff for anything that should not be public: secrets, `.env` files, personal details, debug code, stray files.
- Never commit secrets. Never force-push. Never rewrite published history.
- `public/_headers` must keep its strict content security policy; the tests enforce this.

## 4. Commit

Show the user a one-paragraph summary of the changes and the proposed commit message, in plain English. Commit when they have asked for it. Stay on `main` unless the user wants a branch.

## 5. Push, only on an explicit yes

Ask: "Push this to GitHub? That updates the public site." Push only after a clear yes in the conversation.

## 6. Confirm the live site

Once the live URL above is set: wait for the Cloudflare build, open the live site, and confirm that it loads, the overview shows the expected record count and check date, a detail page opens, and the response carries the `Content-Security-Policy` header. Report what you checked and what you did not.

## Limits

Claude cannot create accounts or enter passwords. Anything in the Cloudflare or GitHub dashboards that needs a sign-in is the user's step; guide them through it.
