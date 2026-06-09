# The Design Story

Premium interior design studio website with a React frontend and Node.js/MongoDB backend.

## Project structure

```
TheDesignStory/
├── frontend/          # React + Vite app
│   └── src/
├── backend/           # Node.js + Express + MongoDB
│   ├── config/        # Database connection
│   ├── schemas/       # Mongoose models
│   ├── controllers/   # Route handlers
│   ├── routes/        # API routes
│   └── server.js
└── package.json       # Root scripts to run both apps
```

## Setup

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Backend environment

Copy `backend/.env.example` to `backend/.env` and paste your MongoDB connection string:

```bash
cp backend/.env.example backend/.env
```

```env
MONGODB_URI=mongodb+srv://your-connection-string-here
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

### 3. Run both apps

```bash
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

Or run separately:

```bash
npm run dev:frontend
npm run dev:backend
```

## Appointment API

**POST** `/api/appointments` — save a client or vendor booking

Saved fields include:
- Form data (name, email, phone, date, time, etc.)
- `status` — defaults to `"pending"` (`pending` | `rejected` | `postponed`)
- `createdAt` / `updatedAt` — automatic timestamps

**GET** `/api/appointments` — list all appointments (for admin use later)

## Build frontend

```bash
npm run build
```

## Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind, Framer Motion, GSAP, Lenis

**Backend:** Node.js, Express, Mongoose, MongoDB
