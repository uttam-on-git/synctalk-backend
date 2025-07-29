import Router from "express"
import { getMessagesForRoom } from "./messages.controller"
import { ensureAuthenticated } from "../../middleware/ensureAuthenticated"

const router = Router();

router.get('/:roomId/messages', ensureAuthenticated, getMessagesForRoom)

export default router;