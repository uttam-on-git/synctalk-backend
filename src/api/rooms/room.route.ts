import { Router } from "express";
import { validate } from "../../middleware/validate";
import { createRoomSchema } from "./room.validate";
import { createRoom, getRooms } from "./room.controller";
import { ensureAuthenticated } from "../../middleware/ensureAuthenticated";

const router = Router();

router.get("/", ensureAuthenticated, getRooms)
router.post("/", ensureAuthenticated, validate(createRoomSchema), createRoom)

export default router;