import { Server, Socket } from "socket.io";
import prisma from "./lib/prisma";

interface NewMessagePayload {
  content: string;
  roomId: string;
  authorId: string;
}

export const setupSocketHandlers = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log(`A user connected: ${socket.id}`);

        socket.on("sendMessage", async (payload: NewMessagePayload) => {
            try {
                const newMessage = await prisma.message.create({
                    data: {
                        content: payload.content,
                        authorId: payload.authorId,
                        roomId: payload.roomId
                    },
                    include: {
                        author: {
                            select: {
                                id: true,
                                username: true
                            }
                        }
                    }
                });
                io.emit('newMessage', newMessage)
            } catch (error) {
                console.error('Error handling new message:', error);
                socket.emit('error', 'Failed to send message.');
            }
        })

        socket.on('disconnect', () => {
            console.log(`A user disconnected: ${socket.id}`);
        });
    })
}