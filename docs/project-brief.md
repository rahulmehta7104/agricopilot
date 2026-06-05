# AgriCopilot: Project Brief 

**App Name**: AgriCopilot  

**One-Line Pitch**: A multi-agent AI platform empowering farmers with personalized crop planning, real-time market insights, and intelligent agricultural decision support.  

**Target User**: Small to medium-scale farmers, agricultural consultants, and agri-business professionals seeking data-driven insights to optimize yield and profitability.  

**Core Features**:  
- **Personalized Farmer Dashboard**: A centralized hub displaying local weather, saved recommendations, and farm profiles.  
- **Conversational Copilot**: An intuitive chat interface providing on-demand agricultural advice.  
- **Secure Authentication**: Robust user management tailored to individual farm profiles and geographical contexts.  

**AI Features**:  
The platform leverages a microservice architecture running LangChain and the Gemini API to orchestrate specialized AI agents:
- **Conversational Copilot**: The core interface for on-demand advice.
- **Weather Agent**: Interprets real-time meteorological data for crop impact.
- **Crop Recommendation Agent**: Suggests optimal planting strategies based on user context.
- *(Phase 2)* **Market Price Prediction** & **Government Scheme Agent**.
- *(Phase 2)* **Full RAG Knowledge Base**: Retrieves verified agricultural best practices.

**Tech Stack**:  
- **Frontend**: React, Tailwind CSS (Vercel)  
- **Backend API**: Node.js, Express.js (Render)  
- **AI Microservice**: Python, FastAPI, LangChain, Gemini API (Render)  
- **Database**: PostgreSQL  

---


