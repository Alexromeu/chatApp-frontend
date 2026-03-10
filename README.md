# chatApp-frontend

A React + TypeScript frontend for a real‑time chat application.  
This project focuses on clean component structure, predictable state management, and a simple UI for interacting with the backend API and WebSocket server.

---

## Features

- User registration and login (JWT-based)
- Real‑time messaging using Socket.io client
- Multiple chat rooms
- Online user presence
- Message history loading
- Clean React component architecture
- TypeScript for type‑safety and maintainability

---
## Project Structure
text```
.
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components (ChatWindow, MessageList, Inputs, etc.)
│   ├── pages/              # Login, Register, Chat pages
│   ├── context/            # Auth context, Socket context
│   ├── hooks/              # Custom hooks (useAuth, useSocket, etc.)
│   ├── services/           # Axios API wrappers
│   ├── utils/              # Helpers and small utilities
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── index.html              # Vite HTML template
├── package.json
└── vite.config.ts


---

## Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **Socket.io Client**
- **Axios**
- **JWT Authentication**



---

## Setup

Install dependencies:

```sh
npm install
