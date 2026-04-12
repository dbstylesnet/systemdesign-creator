# Sysdesign Pathfinder

Interactive **system design quiz** for practicing architecture choices. Pick a project profile and scale, then answer scenario-based questions. You get immediate feedback with explanations, a score out of 10, and a short review at the end.

## What you will practice

The app focuses on **technology and architecture trade-offs** for common system types:

| Project type | Examples of topics |
|--------------|-------------------|
| **Static website** | Static site tools, hosting, asset optimization |
| **CMS** | Content workflows, caching, editorial needs |
| **Monolith** | Structure, deployment, when a single app fits |
| **Microservices** | Service boundaries, communication, operations |
| **SPA** | Client routing, APIs, hosting patterns |
| **SSR** | Rendering strategy, performance, infrastructure |

You also choose a **scale** profile—**fixed** (predictable traffic) or **high scalability** (growth-oriented)—which changes the question set to match that context.

## How to use the app

1. **Open the app**  
   Run it locally (see [Local development](#local-development)) and open the URL shown in the terminal (by default **http://localhost:8080**).

2. **Choose a project type**  
   On the first screen, select the kind of system you want to design (e.g. *Monolith*, *Microservices*). This sets the theme for the quiz.

3. **Choose a scale**  
   Pick *Fixed scale* or *High scalability*. Questions are tailored to that assumption.

4. **Answer the questions**  
   - Each step shows one question and several options.  
   - **Correct answer:** You see a short explanation and the quiz moves to the next question after a moment.  
   - **Incorrect answer:** You see why it is wrong; try another option until you pick a correct one.  
   - A **progress tracker** at the top reflects your path through the flow.

5. **Review your results**  
   At the end you get:

   - A **score out of 10**, based only on questions answered **correctly on the first try** (retries after a wrong guess do not count as “first try”).  
   - A **rating label** (e.g. *Senior Architect*, *Mid-Level Developer*) and a short message.  
   - A **per-question recap** showing what you chose and which answers were ideal on the first attempt.

6. **Start over**  
   Use the restart control on the summary screen to pick a new project type and scale and run through another path.

There is a single main route (`/`). Unknown URLs show a not-found page.

## Local development

### Requirements

- **Node.js 18+** (recommended: current LTS)

### Install and run

```bash
npm install
npm run dev
```

Or:

```bash
npm start
```

### Other commands

| Command | Purpose |
|---------|---------|
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run unit tests (Vitest) |
| `npm run lint` | ESLint |

## Tech stack

- [Vite](https://vitejs.dev/) — dev server and build  
- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)  
- [React Router](https://reactrouter.com/) — routing  
- [Tailwind CSS](https://tailwindcss.com/) — styling  
- [shadcn/ui](https://ui.shadcn.com/)-style components (Radix, etc.)  
- [TanStack Query](https://tanstack.com/query) — available for data fetching (minimal use in the quiz UI)  
- [Vitest](https://vitest.dev/) — tests  

Quiz content and scoring helpers live in `src/data/quizData.ts`. The main UI flow is in `src/components/quiz/QuizFlow.tsx`.

## Project layout (short)

```
src/
  components/quiz/   # Quiz flow, cards, progress, summary
  data/quizData.ts   # Questions, project/scale metadata, scoring
  pages/             # Index (home), NotFound
  App.tsx            # Routes and providers
```
