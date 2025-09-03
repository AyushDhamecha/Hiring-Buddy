# HiringBuddy
DEMO link- https://hiringbuddy-1.onrender.com/

A modern, AI-powered recruitment platform built with Next.js, React, and Tailwind CSS. HiringBuddy streamlines candidate management, interview scheduling, and communication, leveraging AI for resume and video analysis.

## Features

- **Candidate Management**: Centralized database, advanced search by skills/experience, AI resume parsing, and stage-wise status tracking  
- **Communication Tools**: Unified inbox, reusable email templates, calendar-integrated interview scheduling, and response tracking  
- **Interview Process**: Structured interviews with standard questions, scorecards for consistent evaluation, team feedback sharing, and video interview support  
- **Analytics & Reporting**: Visual hiring metrics, customizable performance reports, diversity tracking, and cost-per-hire analysis  
- **Video Analysis**: Candidate intro video upload, speech-to-text transcription (Whisper), AI-based communication skill scoring, and recruiter dashboard display for easy comparison

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/)
- [Nodemailer](https://nodemailer.com/) (Gmail SMTP)
- [Zod](https://zod.dev/) (validation)
- [Sonner](https://sonner.emilkowal.ski/) (notifications)
- [Lucide Icons](https://lucide.dev/)
- Recharts
- Typescript

### 🔹 Technical Implementation

- **Frontend**: Built with Next.js (TypeScript), Tailwind CSS, and Shadcn UI; state via React Context & Hooks; forms with React Hook Form + Zod  
- **Backend**: Serverless API routes in Next.js, secure authentication, integrated database, and calendar/email/video services  
- **AI Features**: Resume parsing, job-candidate matching, AI-assisted replies, and bias reduction tools  
- **User Experience**: Recruiter dashboard, hiring pipeline visualization, real-time team collaboration, and mobile-ready access  

### 🔹 Security & Compliance

- Data encryption, role-based access control, full audit logging  
- GDPR/CCPA compliance tools for secure and transparent data handling  

### 🔹 Integrations

- Connect with ATS and HRIS platforms  
- Post to job boards and enable background checks  
- Sync with calendars, emails, and video tools  

### 🔹 Deployment & Support

- Fast onboarding, expert support, regular feature updates  
- Training resources for easy adoption  

### 🔹 Benefits

- Save time by automating manual tasks  
- Improve hiring quality through AI insights  
- Enhance recruiter and candidate experience  
- Scalable for teams of all sizes
## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/AyushDhamecha/Hiring-Buddy
```

### 2. Install Dependencies

This project uses [pnpm](https://pnpm.io/):

```sh
pnpm install
```

Or use npm/yarn if you prefer (update lockfiles accordingly):

```sh
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
# Google Gemini API Key (for AI resume/video analysis)
GEMINI_API_KEY=your_google_gemini_api_key

# OpenAI API Key (for message generation)
OPENAI_API_KEY=your_openai_api_key

# Email (Gmail SMTP) for sending interview invites
EMAIL_SERVER_USER=your_gmail_address@gmail.com
EMAIL_SERVER_PASSWORD=your_gmail_app_password
EMAIL_FROM_ADDRESS="Your Company Name <your_gmail_address@gmail.com>"
```

> **Note:**  
> - For Gmail, you must use an [App Password](https://support.google.com/accounts/answer/185833) if 2FA is enabled.
> - Never commit your `.env.local` file to version control.

### 4. Run the Development Server

```sh
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── app/                # Next.js app directory (pages, API routes, etc.)
│   ├── api/            # API endpoints (resume/video analysis, invites, etc.)
│   ├── candidates/     # Candidate management UI
│   ├── communication/  # Candidate communication UI
│   ├── jobs/           # Job postings UI
│   ├── send-invite/    # Interview invite UI
│   └── videoanalysis/  # Video analysis UI
├── components/         # Reusable React components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries (PDF utils, etc.)
├── public/             # Static assets (images, videos, resumes)
├── styles/             # Global styles
├── .env.local          # Environment variables (not committed)
├── package.json
├── pnpm-lock.yaml
└── README.md
```

## Available Scripts

- `pnpm dev` — Start the development server
- `pnpm build` — Build for production
- `pnpm start` — Start the production server
- `pnpm lint` — Lint the codebase

## Customization

- **UI Theme:** Tailwind CSS and Radix UI are used for styling. Edit `tailwind.config.ts` and `app/globals.css` as needed.
- **Component Aliases:** See [`components.json`](components.json) for import path aliases.

## Deployment

You can deploy this app to [Render](https://render.com/) or any Node.js hosting provider.

1. Push your code to a GitHub repository.
2. Create a new Web Service on Render and connect your repository.
3. Set the following environment variables in the Render dashboard:
   - `GEMINI_API_KEY`
   - `OPENAI_API_KEY`
   - `EMAIL_SERVER_USER`
   - `EMAIL_SERVER_PASSWORD`
   - `EMAIL_FROM_ADDRESS`
4. Set the build command to `pnpm install && pnpm build`.
5. Set the start command to `pnpm start`.
6. Deploy your service.

For more details, see [Render's Node.js deployment guide](https://render.com/docs/deploy-node-express-app).

## License

MIT

---

**Made with ❤️ by the HiringBuddy Team**
