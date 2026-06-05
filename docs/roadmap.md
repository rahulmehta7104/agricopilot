## Week-by-Week Roadmap

**Week 1: Orientation & Setup**
- Finalize system architecture and tech stack choices.
- Initialize GitHub repo, set up `client`, `server`, and `ai-service` directories.
- Configure local PostgreSQL database.

**Week 2: Frontend Foundations**
- Set up React with Vite and Tailwind CSS.
- Create routing and core layout (Sidebar, Navbar).
- Implement basic generic components (Buttons, Inputs, Modals).

**Week 3: UI/UX & Component Design**
- Build Farmer Dashboard UI layout.
- Build Chat Interface UI for Copilot interaction.
- Integrate responsive design.

**Week 4: Backend & API Development**
- Initialize Express.js backend.
- Define RESTful routes for users, chat history, and dashboard data.
- Setup API gateway to proxy requests to the AI service.

**Week 5: Database Design & Management**
- Finalize PostgreSQL schema (Users, Farms, ChatSessions, Messages).
- Implement ORM (Prisma/TypeORM) and migrations.
- Connect Express backend to the DB.

**Week 6: Authentication & Security**
- Implement JWT-based user authentication.
- Secure API endpoints.
- Connect frontend auth flow (Login/Register/Protected Routes).

**Week 7: AI Integration**
- Build Python FastAPI microservice.
- Setup LangChain and integrate Gemini API.
- Create the generic Conversational Agent and Weather Tool.

**Week 8: Frontend Integration & Polish**
- Connect React frontend to Node backend.
- Wire up the chat interface to display AI responses.
- Implement loading states, error handling, and streaming (if possible).

**Week 9: Deployment**
- Deploy Frontend to Vercel.
- Deploy Backend (Node) and AI Service (Python) to Render.
- Provision managed PostgreSQL (e.g., Supabase or Render DB).
- Setup environment variables and CORS.

**Week 10: Portfolio & Documentation**
- Write comprehensive README.md.
- Record demo video and take screenshots.
- Clean up code, add comments, and finalize project presentation.
