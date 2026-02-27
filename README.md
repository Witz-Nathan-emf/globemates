
# Globe Mates MVP

Globe Mates is a social connection application designed for young travelers (18-25+). It focuses on safety, cultural exchange, and simplicity.

## Tech Stack Justification
- **Frontend**: React + Tailwind + TypeScript (for rapid development and robust UI).
- **State**: Mocked within the application for this demo, persisting in local memory.
- **Backend (Reference)**: Node.js + Prisma + PostgreSQL (standard for scalable social apps).
- **Safety**: Haversine distance calculations and strict boolean filtering to respect user preferences (e.g., girls only).

## Features
- **Strict Filters**: Users like Julie (18) can filter out anyone not matching her criteria (Gender, Age, Proximity).
- **Activities**: 1-click joining of local events (Alex's user story).
- **Safety Tips**: Mandatory "Safety First" onboarding when starting interactions.
- **Trust Score**: Rating system (1-5) and "Verified" badges for security.

## Installation
1. `npm install`
2. `npm run dev`

## Database (Prisma)
The reference schema is located in `prisma/schema.prisma`. It includes indexes for geolocation and timestamps to handle large volumes of activity searches.

## API Specification
- `POST /api/auth/signup`: Create user
- `GET /api/users/search?gender=Female&ageMax=20&distance=10`: Filtered search
- `POST /api/activities/:id/join`: Join event
- `POST /api/reports`: Submit a safety report
- `GET /api/chats/:convId/messages`: Fetch conversation
