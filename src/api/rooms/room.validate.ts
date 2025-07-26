import { z } from "zod"

export const createRoomSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Room name must be at least 3 characters"),
    description: z.string().optional(),
  }),
});