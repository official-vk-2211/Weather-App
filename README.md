# React Weather App

A modern, responsive Weather Application built with React, TypeScript, Vite, Zustand, Tailwind CSS, and OpenWeather API.

## Features

- User Registration
- User Login & Logout
- Persistent authentication using Local Storage
- Protected routes
- City weather search
- Default weather dashboard
- Detailed weather information
- Search history
- User-specific search history
- Remove individual history items
- Clear all search history
- Loading and error states
- Responsive design for desktop, tablet, and mobile
- OpenWeather API integration
- Client-side caching to reduce unnecessary API requests

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Zustand
- Tailwind CSS
- Native Fetch API
- Lucide React
- OpenWeather API
- Browser Local Storage

## Project Structure

```text
src/
├── api/
│   └── weatherApi.ts
├── components/
│   ├── auth/
│   ├── common/
│   ├── layout/
│   └── weather/
├── hooks/
├── pages/
├── routes/
├── services/
├── store/
├── types/
├── utils/
├── App.tsx
├── index.css
└── main.tsx