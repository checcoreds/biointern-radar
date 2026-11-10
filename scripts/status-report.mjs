// Prints which real records need their official sources rechecked.
// Read-only: it loads the local data and changes nothing. No network access.
// Usage: npm run status:report            (readable list)
//        npm run status:report -- --json  (machine-readable, for agents)
//        npm run status:report -- --date 2026-12-01  (pretend "today")
import { createServer } from 'vite'

const args = process.argv.slice(2)
const json = args.includes('--json')
const dateArg = args[args.indexOf('--date') + 1]
const now =
  args.includes('--date') && dateArg
    ? new Date(`${dateArg}T12:00:00Z`)
    : new Date()
if (!Number.isFinite(now.getTime())) {
  console.error('Invalid --date. Use YYYY-MM-DD.')
  process.exit(1)
}

const server = await createServer({
  configFile: false,
  logLevel: 'silent',
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
})
try {
  const { realOpportunities } = await server.ssrLoadModule(
    '/src/data/realOpportunities.ts',
  )
  const { reviewStatuses } = await server.ssrLoadModule(
    '/src/lib/statusReview.ts',
  )
  const reviews = reviewStatuses(realOpportunities, now)
  if (json) {
    console.log(
      JSON.stringify(
        { generatedFor: now.toISOString().slice(0, 10), reviews },
        null,
        2,
      ),
    )
  } else {
    const labels = {
      urgent: 'URGENT',
      soon: 'Check soon',
      routine: 'Routine',
      ok: 'OK',
    }
    console.log(
      `Status review for ${now.toISOString().slice(0, 10)} · ${reviews.length} real records\n`,
    )
    for (const review of reviews) {
      console.log(`[${labels[review.priority]}] ${review.title}`)
      console.log(
        `  id: ${review.id} · status: ${review.storedStatus}` +
          (review.displayedStatus !== review.storedStatus
            ? ` (shown as ${review.displayedStatus})`
            : '') +
          ` · deadline: ${review.deadline ?? 'none'}` +
          ` · status checked: ${review.statusCheckedAt ?? 'never'}`,
      )
      for (const reason of review.reasons) console.log(`  - ${reason}`)
      if (review.priority !== 'ok')
        for (const url of review.sources) console.log(`  source: ${url}`)
      console.log('')
    }
  }
} finally {
  await server.close()
}
