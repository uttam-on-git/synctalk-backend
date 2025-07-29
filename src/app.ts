import express, { Request, Response } from "express";
import authRoutes from "./api/auth/auth.route";
import roomRoutes from "./api/rooms/room.route"
import messageRoutes from "./api/messages/messages.route"
import cors from "cors"
const app = express();

//allowed origins
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    // allow requests with no origin (mobile or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

// middleware
app.use(cors(corsOptions))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('SyncTalk API is running.')
}) 

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/rooms', messageRoutes);

export default app;