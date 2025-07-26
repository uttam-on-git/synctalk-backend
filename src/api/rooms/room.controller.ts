import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export const getRooms = async (req: Request, res: Response) => {
    try {
        const rooms = await prisma.room.findMany({
            orderBy: {
                createdAt: 'asc',
            },
        });
        res.status(200).json(rooms)
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve rooms."})
    }
}

export const createRoom = (req: Request, res:Response) => {
    const {name, description} = req.body;
    const userId = req.user!.id;

    try {
        const newRoom = prisma.room.create({
            data: {
                name,
                description,
                members: {
                    connect: { id: userId}
                }
            }
        });
        res.status(201).json(newRoom);
    } catch (error) {
        // prisma constrain voilation > room name already exists 
        if ((error as any).code === 'P2002') {
      return res.status(409).json({ message: 'A room with this name already exists.' });
    }
    res.status(500).json({ message: 'Failed to create room.' });
    }
}