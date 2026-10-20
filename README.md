# Gatherly — Celebration & Event Planner

An event-planning workspace for weddings, birthdays and community events. Built for PromptWars Challenge 5.

**Live planner:** https://vermillion-cucurucho-658e45.netlify.app/

**Source repository:** https://github.com/muhammedashad/gatherly-event-planner

## Current status

Implemented: event creation/editing, exact INR budget allocations, spending tracker, task timeline, custom tasks, vendor checklist, local persistence, JSON export, print styling, responsive layout, and a server-side OpenAI integration.

The planner is publicly deployed on Netlify. The live OpenAI connection has **not** been configured or tested. Sample ideas are explicitly labeled. The deployed static planner does not run the AI backend; live generation remains required before claiming a completed GenAI submission.

## Run locally

Requires Node.js 22 or later. There are no external dependencies or build steps.

```sh
node server.mjs
```

Open http://127.0.0.1:4173. Run tests:

```sh
node --test tests/*.test.mjs
```

## Enable live AI

Configure `OPENAI_API_KEY` privately in the server environment. Do not put a key in browser code, a public repository or chat. `OPENAI_MODEL` defaults to `gpt-4.1-mini`; choose a model available to your account that supports structured outputs. Set a provider usage limit before public deployment.

The server calls the OpenAI Responses API for three personalized ideas and event-planning Q&A. Responses use JSON Schema structured output, are checked again before returning to the browser, and are not stored by the application server. API requests set `store: false`.

Event details and questions are transmitted only when the visitor asks for AI generation. The browser displays this before use. Do not enter sensitive guest information.

## Hosting

For the complete app, deploy `server.mjs` to a Node-compatible host, configure `HOST=0.0.0.0`, its assigned `PORT`, and the private AI environment variables. The server defaults to loopback for local development. Use HTTPS and set hosting-level rate limits for public traffic.

For the planner-only static deployment, publish the contents of `dist/`, with `index.html` at the upload root. Static hosting alone does not execute `server.mjs` or enable AI. Do not submit a planner-only preview as a verified GenAI app.

The per-IP limiter is process-local (five AI requests per minute), suitable for a small single-instance demonstration. Use shared rate-limit storage and provider budgets for multi-instance public deployments.

## Design and accessibility

Sage, warm ivory and terracotta; original CSS floral illustration; no external fonts, images or scripts. Semantic navigation and tables, form labels, native modal focus behavior, keyboard focus indicators, error/status announcements, a skip link, responsive layouts, and print CSS are included. The deployed desktop overview was visually checked. Full browser interaction, mobile and screen-reader QA remain pending.

## Correctness and security

- Budget allocation uses largest remainders to preserve every rupee.
- Templates vary by celebration type and reserve 10% contingency.
- Date calculations handle leap years and shift past preparation milestones to today for upcoming events.
- Server validates event input; request bodies are capped at 12 KB.
- AI keys remain server-side, requests time out after 30 seconds, and upstream errors are sanitized.
- User-provided and AI-generated text is escaped before DOM insertion.
- Same-origin checks, explicit static-file allowlisting, CSP and security headers are included in the Node server.
- Vendor quotes are separate from actual spending; no vendor contacts or prices are fabricated.

## Repository map

| Path | Purpose |
| --- | --- |
| `dist/` | Browser app, stylesheet and planning module |
| `lib/planner.mjs` | Input validation, exact budget math and timeline templates |
| `lib/ai.mjs` | Server-side model request and output validation |
| `server.mjs` | Dependency-free static server and API |
| `tests/` | Ten deterministic tests; AI responses are mocked |
| `SUBMISSION.md` | Honest readiness checklist and submission copy |
| `DEMO-SCRIPT.md` | Demo recording plan |

Keep `dist/planner.mjs` synchronized with `lib/planner.mjs` after edits.

## Validation performed

Ten automated tests passed on 20 October 2026. JavaScript syntax checks passed. The public Netlify planner and desktop overview were verified. Live model requests, a demo recording and competition submission remain pending.

Official API reference: https://developers.openai.com/api/reference/resources/responses/methods/create
