import dotenv from "dotenv"
dotenv.config();

import http from "http"
import { Server } from "socket.io"
import app from "./app"
import { setupSocketHandlers } from "./socket"

const PORT = process.env.PORT || 3001

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        methods: ["GET", "POST"]
    }
})

// Make the io instance available to other parts of the app
app.set('io', io);

setupSocketHandlers(io);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})