import express, { Request, Response } from "express";
import authRoutes from "../src/api/auth/auth.route"
import cors from "cors"
const app = express();

// middleware
app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('SyncTalk API is running.')
}) 

app.use('/api/auth', authRoutes)

export default app;