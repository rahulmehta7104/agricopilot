# AgriCopilot Backend

Backend API for AgriCopilot – Multi-Agent AI Platform for Crop Planning, Profit Prediction, and Farmer Decision Support.

## Architecture

This project uses a clean architecture structure:
- `controllers/`: Handles incoming requests and sends responses.
- `routes/`: Maps endpoints to controllers.
- `models/`: Data schemas and structures (in-memory for Week 4).
- `middleware/`: Custom Express middleware.
- `data/`: In-memory data storage and mock data.
- `utils/`: Reusable helper functions.
- `config/`: Application configuration files.

## Setup
1. Navigate to the `backend` directory.
2. Run `npm install`
3. Copy `.env.example` to `.env` (if not already present).
4. Run `npm run dev` to start the server on port 5000.
