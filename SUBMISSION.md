# PromptWars — Challenge 5 submission pack

Project: **Gatherly — Celebration & Event Planner**

## Requirements read from the provided screenshots

- Build a GenAI-powered assistant for weddings, birthdays and community events, including budgets, timelines, vendor checklists and personalized ideas.
- Public GitHub repository, under 10 MB.
- Deployed project link.
- Demo video: unlisted YouTube or a Drive link accessible to reviewers.
- Describe updates in the deployed version.
- Describe GenAI services and where they are used (1,024-character field).
- LinkedIn post URL.
- Maximum three submission attempts.
- Screenshot deadline: **1 November 2026, 11:59 PM IST**. Recheck the platform before submitting.

## Readiness — do not submit until all are checked

- [x] Planner source implemented.
- [x] Ten automated tests pass (AI tests use mocks).
- [x] Source kept well below the 10 MB limit; exclude node_modules and credentials.
- [ ] Live AI generation configured and verified.
- [ ] Browser functionality and mobile layout verified.
- [x] Public GitHub repository created; source folder structure and project links added.
- [x] Static planner publicly deployed on Netlify and desktop overview checked.
- [ ] Full application deployed and checked without authentication.
- [ ] Actual product demo recorded and uploaded with reviewer access.
- [ ] LinkedIn post published with the user's authorization.
- [ ] Final submission reviewed and submitted on the competition platform.

## Description of changes — draft

Gatherly brings event details, budgets, timelines, vendors and creative ideas into one responsive workspace. Users can plan weddings, birthdays and community events, enter an INR budget and guest count, receive exact category allocations with a contingency reserve, track spending, complete date-based tasks and maintain vendor shortlists and quotes. Plans are saved on the device and can be exported as JSON or printed. The implementation includes input validation, accessible form labels, keyboard support, server-side AI handling, request limits and automated tests.

The planner is deployed at the link below. The server-side AI integration is present in source, but is not active on the static Netlify deployment.

## GenAI services field — use ONLY after a successful live test

OpenAI Responses API powers Gatherly's personalized ideas and event-planning Q&A. The server sends the event type, INR budget, guest count, date, location and preferences to a structured-output model. It generates three tailored ideas or answers a planning question, covering themes, activities, accessibility, contingency planning and cost-conscious alternatives. Keys stay on the server; inputs and model output are validated, requests are rate-limited and timed out, and errors are shown clearly. Budget arithmetic and task dates use deterministic code rather than model-generated calculations.

Current truth: integration is implemented but not connected or live-tested. Enter the actual configured model if the form asks for it.

## LinkedIn post — draft, not published

Celebrations should leave room for joy—not just a longer to-do list.

For PromptWars Challenge 5, I’m building Gatherly: a planning workspace for weddings, birthdays and community events, with budgets, timelines, vendor checklists and personalized event ideas.

The focus: practical planning, thoughtful details and a clear view of what comes next.

[Add the verified public app and repository links before posting. Update the AI claim to match the final live-tested version.]

#PromptWars #GenerativeAI #BuildInPublic #EventPlanning

## Links still required

Public repository: https://github.com/muhammedashad/gatherly-event-planner
Deployed static planner: https://vermillion-cucurucho-658e45.netlify.app/
Deployed AI backend: not yet available.
Demo video: not recorded or uploaded.
LinkedIn post: not published.

No submission attempt has been used by this work.
