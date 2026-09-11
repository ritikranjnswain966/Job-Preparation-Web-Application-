# AI Job Preparation Assistant

An AI-powered job-preparation app that compares a candidate's resume and profile with a job description, then creates a tailored interview-preparation report.

The report includes a role match score, technical and behavioral practice questions with suggested answers, skill gaps, a day-by-day preparation roadmap, and a downloadable AI-tailored resume.

## What it does

- Creates accounts and signs users in with JWT-backed, HTTP-only cookies.
- Accepts a PDF resume, job description, and optional self-description.
- Extracts text from the uploaded resume and uses Google Gemini to generate a structured interview report.
- Saves reports to MongoDB and shows a user's recent plans.
- Displays technical questions, behavioral questions, skill gaps, and a preparation roadmap.
- Generates a tailored resume as a PDF for a saved report.

## Built with

| Area | Technology |
| --- | --- |
| Client | React 19, Vite, React Router, SCSS, Axios |
| Server | Node.js, Express 5 |
| Database | MongoDB with Mongoose |
| Authentication | JSON Web Tokens, bcrypt, cookies |
| AI | Google GenAI (Gemini) with Zod schemas |
| Files and PDFs | Multer, pdf-parse, Puppeteer |

## Project layout

```text
.
├── frontend/                         # Vite + React client
│   └── src/features/
│       ├── auth/                     # Sign-up, sign-in, auth state
│       └── interview/                # Plan creation, report UI, API calls
├── backend/                          # Express API
│   ├── server.js                     # Server entry point
│   └── src/
│       ├── config/                   # MongoDB connection
│       ├── controllers/              # Auth and interview handlers
│       ├── middlewares/              # Auth and in-memory upload handling
│       ├── models/                   # User, report, and token blacklist schemas
│       ├── routes/                   # API routes
│       └── services/                 # Gemini and resume-PDF generation
└── README.md
```

## Prerequisites

- Node.js 18 or later
- npm
- A MongoDB connection string (local MongoDB or MongoDB Atlas)
- A Google AI API key with access to the Gemini model used by the server

Puppeteer downloads and uses a Chromium browser for resume-PDF generation. On Linux servers, its usual system-library requirements must also be installed.

## Run locally

1. Clone the repository and install the dependencies for both applications.

   ```bash
   git clone https://github.com/ritikranjnswain966/Job-Preparation-Web-Application-.git
   cd Job-Preparation-Web-Application-

   cd backend
   npm install

   cd ../frontend
   npm install
   ```

2. Create `backend/.env` with the following values.

   ```env
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/job-preparation
   JWT_SECRET=replace-with-a-long-random-secret
   GOOGLE_GENAI_API_KEY=your-google-ai-api-key
   ```

   In PowerShell, you can create the file with:

   ```powershell
   New-Item -Path backend/.env -ItemType File
   ```

3. Start the API in one terminal.

   ```bash
   cd backend
   npm run dev
   ```

4. Start the client in a second terminal.

   ```bash
   cd frontend
   npm run dev
   ```

5. Open the address Vite prints—normally `http://localhost:5173`—then register an account and create an interview plan.

## How to use it

1. Register or sign in.
2. Paste the target job description.
3. Upload a PDF resume (maximum size: 3 MB). You can also add a self-description for extra context.
4. Generate the interview strategy.
5. Review the score, question sets, skill gaps, and preparation roadmap.
6. Use **Download Resume** to create a job-tailored PDF from the selected report.

> The current server implementation requires a resume file when generating a report, even though the interface also supports entering a self-description.

## API reference

All protected endpoints require the authentication cookie set by sign-in or registration.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create an account. Body: `username`, `email`, `password`. |
| `POST` | `/api/auth/login` | Sign in. Body: `email`, `password`. |
| `GET` | `/api/auth/logout` | Sign out and blacklist the current token. |
| `GET` | `/api/auth/get-me` | Get the signed-in user's details. |
| `POST` | `/api/interview/` | Generate and save a report. Send `multipart/form-data` with `resume`, `jobDescription`, and `selfDescription`. |
| `GET` | `/api/interview/` | List the signed-in user's report summaries. |
| `GET` | `/api/interview/report/:interviewId` | Get one report. |
| `POST` | `/api/interview/resume/pdf/:interviewReportId` | Download an AI-tailored resume PDF. |

## Available scripts

| Location | Command | Purpose |
| --- | --- | --- |
| `frontend` | `npm run dev` | Start the Vite development server. |
| `frontend` | `npm run build` | Create a production client build. |
| `frontend` | `npm run lint` | Run ESLint. |
| `frontend` | `npm run preview` | Preview the production build locally. |
| `backend` | `npm run dev` | Start the Express server with Nodemon. |

## Configuration notes

- The frontend currently calls `http://localhost:3000` directly; it does not read a `VITE_API_URL` environment variable.
- CORS is configured in the backend for `http://localhost:5173` with cookies enabled. Update `backend/src/app.js` before deploying the client to another origin.
- Keep `backend/.env` private. It contains the database URI, JWT secret, and Google AI key.

## License

No license file is currently included in this repository. Add one before distributing the project under a specific open-source license.
