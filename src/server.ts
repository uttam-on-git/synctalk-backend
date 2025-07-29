import dotenv from "dotenv"
dotenv.config();

import http from "http"
import { Server } from "socket.io"
import app from "./app"
import { setupSocketHandlers } from "./socket"

const PORT = process.env.PORT || 3001

const server = http.createServer(app)

const allowedOrigins = [
    process.env.FRONTEND_URL
];

const io = new Server(server, {
    cors: {
        origin: allowedOrigins.filter(Boolean) as string[],
        methods: ["GET", "POST"]
    }
})

// Make the io instance available to other parts of the app
app.set('io', io);

setupSocketHandlers(io);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})