# AI Placement Tracker

**The Ultimate AI Engineer Journey Tracker**

A production-ready Next.js SaaS foundation where students can register, log in, track DSA, AI roadmap progress, projects, placements, notes, XP, achievements, and leaderboard standing.

## Stack

- Next.js 15, React 19, TypeScript
- Tailwind CSS, Framer Motion, GSAP-ready styling, Three.js background
- Prisma ORM with PostgreSQL
- Auth.js / NextAuth credentials auth
- Recharts analytics
- Zustand-ready client state architecture

## Local Setup

```bash
npm install
copy .env.example .env
```

Update `.env` with a PostgreSQL connection string from NeonDB or Supabase.

```bash
npx auth secret
npm run db:push
npm run db:seed
npm run dev
```

Open `http://localhost:3000`, register a user, then enter the dashboard.

## Database

The Prisma schema includes:

- users
- accounts / sessions / verification tokens
- tasks
- dsa_progress
- roadmap_progress
- projects / project_tasks
- achievements / user_achievements
- study_sessions
- applications
- notes

## Deployment

### Vercel

1. Push the repo to GitHub.
2. Create a PostgreSQL database on NeonDB or Supabase.
3. Import the repo into Vercel.
4. Add environment variables:

```txt
DATABASE_URL=your_postgres_url
AUTH_SECRET=your_generated_secret
AUTH_URL=https://your-domain.vercel.app
NEXTAUTH_URL=https://your-domain.vercel.app
```

5. Set build command:

```txt
npm run build
```

6. Deploy.

After first deployment, run locally or in a secure deployment shell:

```bash
npm run db:push
npm run db:seed
```

## Functional Areas

- Register, login, logout
- Profile-ready schema and update API
- Daily task tracker with XP rewards
- DSA tracker with topic, platform, and difficulty analytics
- AI engineer roadmap unlock system
- Project tracker with stack and completion
- Placement application tracker
- Notes system
- Global leaderboard
- Achievement catalog
- Futuristic landing page and dashboard UI
