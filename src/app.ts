import express, { Request, Response } from "express";
import authRoutes from "./api/auth/auth.route";
import roomRoutes from "./api/rooms/room.route"
import messageRoutes from "./api/messages/messages.route"
import cors from "cors"
const app = express();

// middleware
app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('SyncTalk API is running.')
}) 

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/rooms', messageRoutes);

export default app;