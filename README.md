# 🌾 AgriCopilot

> Multi-Agent AI Platform for Crop Planning, Profit Prediction, and Farmer Decision Support

## Overview

AgriCopilot is an AI-powered agricultural decision support platform designed to help farmers make informed and data-driven decisions. The platform combines multiple specialized AI agents to provide crop recommendations, weather-based insights, market intelligence, and personalized farming assistance through a conversational interface.

The goal of AgriCopilot is to improve agricultural productivity and profitability by delivering actionable insights in a simple and accessible manner.

## Problem Statement

Farmers often struggle to access reliable information regarding crop selection, weather conditions, market prices, and government support schemes. AgriCopilot aims to centralize these services into a single intelligent platform.

## Key Features

* 🌦️ Weather Analysis Agent
* 🌱 Crop Recommendation Agent
* 📈 Market Intelligence & Profit Prediction
* 🏛️ Government Scheme Recommendation Agent
* 🤖 Conversational AI Copilot
* 📚 RAG-based Agricultural Knowledge Assistant
* 👨‍🌾 Personalized Farmer Dashboard

## Tech Stack

### Frontend

* React
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js

### AI Services

* Python
* FastAPI
* LangChain
* Gemini API

### Database

* PostgreSQL

## Project Structure

```text
AgriCopilot/
├── frontend/
├── backend/
├── ai-service/
├── database/
├── docs/
├── datasets/
├── deployment/
├── README.md
└── .gitignore
```

## Development Roadmap

### Week 1
* Project Planning
* Architecture Design
* Repository Setup

### Week 2
* Frontend Foundations

### Week 3
* UI/UX & Component Design

### Week 4
* Backend & API Development

### Week 5
* Database Design & Management

### Week 6
* Authentication & Security

### Week 7
* AI Integration

### Week 8
* Frontend Integration & Polish

### Week 9
* Deployment

### Week 10
* Documentation & Portfolio

## Current Status

✅ Week 1 Completed
✅ Week 2 Completed
✅ Week 3 Completed
✅ Week 4 Completed

### Completed Work

#### Week 1

* Project ideation and scope definition
* System architecture design
* Repository initialization
* Development roadmap creation
* Technology stack finalization

#### Week 2

* React + Vite application setup
* Tailwind CSS integration
* React Router configuration
* Responsive navigation system
* Home page development
* About page development
* Dashboard page development
* Login page development
* Reusable UI components
* Premium SaaS-inspired UI design
* Mobile responsive layouts

#### Week 3

* Designed low-fidelity wireframes in Figma
* Created reusable UI component library
* Implemented Button component with multiple variants and sizes
* Implemented reusable Input component with validation support
* Developed Modal component with keyboard accessibility
* Added Toast notification system
* Built Loader and Skeleton loading components
* Created centralized UI component exports
* Developed Component Showcase page
* Implemented Dark/Light theme system
* Added theme persistence using localStorage
* Improved dashboard UI and user experience
* Optimized layouts for desktop, tablet, and mobile devices
* Tested responsiveness across 1440px, 768px, and 375px viewports

#### Week 4

**Backend**
* Express.js backend setup
* REST API architecture
* Crop Management API
* CRUD endpoints
* Search endpoint
* Request validation
* Centralized error handling middleware
* Environment variable support
* CORS configuration
* Health check endpoint
* In-memory data storage

**Frontend Integration**
* Connected React frontend to backend
* Axios API service layer
* Dynamic crop data rendering
* Loading state
* Error state
* API integration with Dashboard

### Current Application Pages

* Home
* About
* Dashboard
* Login

### Current Features

#### Frontend
* Responsive Navbar
* Hero Section
* Feature Cards
* Dashboard Widgets
* Mobile Navigation Menu
* Modern Footer
* Responsive Layout
* Dark / Light Theme Support
* Theme Persistence
* Component Showcase Page
* Reusable UI Component Library
* Toast Notifications
* Modal System
* Skeleton Loaders
* Backend API Integration
* Dynamic Dashboard Data
* Loading State
* Error Handling

#### Backend
* Express REST API
* CRUD Operations
* Search Functionality
* Request Validation
* Error Handling Middleware
* CORS
* Environment Variables

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/crops` | Fetch a list of all crops |
| GET | `/api/crops/:id` | Fetch details of a single crop by ID |
| POST | `/api/crops` | Create a new crop record |
| PUT | `/api/crops/:id` | Update an existing crop by ID |
| DELETE | `/api/crops/:id` | Delete a crop by ID |
| GET | `/api/crops/search?q=` | Search crops by name or season |

### UI Component Library

The application includes a reusable component system located in:

```text
src/components/ui/
```

Components:

* Button
* Input
* Modal
* Toast
* Loader
* Card
* ThemeToggle

These components are designed to promote consistency, maintainability, and scalability across the application.

### Next Milestone

Week 5: Database Design & Management

Upcoming Focus:

* PostgreSQL integration
* Database schema
* Persistent storage
* Replace in-memory array
* API integration with PostgreSQL

## Internship Progress

| Week | Module | Status |
|--------|--------|--------|
| Week 1 | Project Setup & Planning | ✅ Completed |
| Week 2 | Frontend Foundations | ✅ Completed |
| Week 3 | UI/UX & Component Design | ✅ Completed |
| Week 4 | Backend & API Development | ✅ Completed |
| Week 5 | Database Design & Management | ⏳ Pending |
| Week 6 | Authentication & Security | ⏳ Pending |
| Week 7 | AI Integration | ⏳ Pending |
| Week 8 | Frontend Integration & Polish | ⏳ Pending |
| Week 9 | Deployment | ⏳ Pending |
| Week 10 | Documentation & Portfolio | ⏳ Pending |


## Setup Instructions

### Frontend Setup

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/AgriCopilot.git
cd AgriCopilot/frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

### Backend Setup

Navigate to the backend directory:

```bash
cd ../backend
```
*(or `cd backend` from the root)*

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

**Local URLs:**
* Frontend URL: `http://localhost:5173`
* Backend URL: `http://localhost:5000`

### Dependencies

#### Frontend
* React
* Vite
* Tailwind CSS v4
* React Router DOM
* Lucide React
* Axios

#### Backend
* Express
* CORS
* dotenv
* Nodemon

### Database & AI Services

🚧 Coming Soon

Database, authentication, and AI services will be implemented in upcoming development phases.

## Author

Rahul Mehta
