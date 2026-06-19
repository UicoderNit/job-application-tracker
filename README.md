# Job Application Tracker

A resume-ready MERN application for tracking job applications from wishlist to offer. It includes authentication, protected CRUD workflows, filtering, dashboard analytics, responsive UI, and deployment-friendly environment configuration.

## Features

- JWT authentication with registration, login, logout, and protected user data.
- Job application CRUD with company, position, location, job type, salary, status, source, dates, contacts, notes, and job URLs.
- Dashboard analytics with totals, status breakdowns, recent applications, upcoming deadlines, and Recharts visualizations.
- Search, filter, and sort applications by company, position, status, job type, location, deadline, and date.
- Server-side validation, centralized error handling, and user-scoped data access.
- Seed script for demo data and screenshot-ready portfolio presentation.

## Tech Stack

- Frontend: React, Vite, React Router, Axios, Tailwind CSS, Recharts, Lucide React
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- Deployment targets: Vercel or Netlify for the client, Render or Railway for the server, MongoDB Atlas for the database

## Project Structure

```text
client/   React Vite app
server/   Express API and MongoDB models
```

## Setup

1. Install dependencies:

```bash
npm install
npm run install:all
```

2. Create environment files:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

3. Update `server/.env` with your MongoDB Atlas URI and JWT secret.

4. Start both apps:

```bash
npm run dev
```

The client runs on `http://localhost:5173` and the API runs on `http://localhost:5000`.

## Demo Data

After setting `MONGO_URI`, seed the database:

```bash
npm run seed --prefix server
```

Demo login:

- Email: `demo@example.com`
- Password: `Password123!`

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/jobs`
- `POST /api/jobs`
- `GET /api/jobs/stats`
- `GET /api/jobs/:id`
- `PATCH /api/jobs/:id`
- `DELETE /api/jobs/:id`

## Deployment Notes

Set these variables on the backend host:

- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URL`
- `PORT`

Set this variable on the frontend host:

- `VITE_API_URL`

Build the frontend with `npm run build --prefix client`.
