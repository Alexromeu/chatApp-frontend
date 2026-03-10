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

## Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **Socket.io Client**
- **Axios**
- **JWT Authentication**

---

## Project Structure
src/
├── components/       # UI components (chat window, message list, inputs, etc.)
├── pages/            # Login, Register, Chat pages
├── hooks/            # Custom hooks (auth, socket, etc.)
├── context/          # Auth context, socket context
├── services/         # API wrappers (Axios)
└── main.tsx          # App entry point



---

## Setup

Install dependencies:

```sh
npm install
