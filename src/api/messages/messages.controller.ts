import { Request, Response } from "express";
import prisma from "../../lib/prisma";

export const getMessagesForRoom = async (req:Request, res: Response) => {
    const { roomId } = req.params;

    try {
        const messages = await prisma.message.findMany({
            where: {
                roomId
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            },
            orderBy: {
                createdAt: "asc"
            }
        })
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json('Failed to retrieve messages.')
    }
}