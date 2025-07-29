# SyncTalk - Real-Time Chat Backend

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?logo=socketdotio&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)

This repository contains the backend server for **SyncTalk**, a full-stack, real-time chat application. It provides a hybrid architecture with a secure REST API for authentication and a real-time WebSocket server for instant messaging.

---

## ✨ Features

-   **Real-Time Communication:** Utilizes WebSockets via **Socket.IO** to push messages and updates to all connected clients instantly.
-   **Secure User Authentication:** Implements a complete email/password registration and login system from scratch, featuring secure password hashing with **Argon2**.
-   **JWT-Based Authorization:** Uses JSON Web Tokens to secure all private API endpoints and WebSocket events.
-   **Multi-Room Chat:** Includes API endpoints for creating and listing chat rooms, with WebSocket logic to manage users joining and leaving rooms.
-   **Robust & Type-Safe:** Built with TypeScript and uses Zod for strict, schema-based input validation on all critical API routes.
-   **Persistent Database:** Comes with a pre-configured Docker Compose file for a consistent and persistent local PostgreSQL database, managed by the Prisma ORM.

---

## 🛠️ Tech Stack

-   **Runtime:** [Node.js](https://nodejs.org/)
-   **Framework:** [Express.js](https://expressjs.com/)
-   **Real-time Engine:** [Socket.IO](https://socket.io/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Database:** [PostgreSQL](https://www.postgresql.org/)
-   **ORM:** [Prisma](https://www.prisma.io/)
-   **Password Hashing:** [Argon2](https://www.npmjs.com/package/argon2)
-   **Validation:** [Zod](https://zod.dev/)

---

## 🚀 Getting Started

Follow these instructions to get a local copy of the backend up and running.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Docker](https://www.docker.com/products/docker-desktop/) and Docker Compose

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/synctalk-backend.git](https://github.com/your-username/synctalk-backend.git)
    cd synctalk-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Make a copy of the example environment file: `cp .env.example .env`
    -   Open the `.env` file and fill in your database password and a strong `JWT_SECRET`.

4.  **Start the database:**
    -   Make sure Docker is running.
    -   Run `docker-compose up -d` to start the PostgreSQL container.

5.  **Run database migrations:**
    -   This will create the `User`, `Room`, and `Message` tables.
        ```bash
        npx prisma migrate dev
        ```

### Running the Application

-   To start the development server with hot-reloading:
    ```bash
    npm run dev
    ```
-   The server will be running at `http://localhost:3001`.

---

## ⚙️ API Endpoints

| Method | Route                       | Protection | Description                               |
| :----- | :-------------------------- | :--------- | :---------------------------------------- |
| `POST` | `/api/auth/register`        | Public     | Creates a new user account.               |
| `POST` | `/api/auth/login`           | Public     | Logs in a user and returns a JWT.         |
| `POST` | `/api/rooms`                | Private    | Creates a new chat room.                  |
| `GET`  | `/api/rooms`                | Private    | Retrieves a list of all available rooms.  |
| `GET`  | `/api/rooms/:roomId/messages` | Private    | Retrieves message history for a room.     |

```
</markdo