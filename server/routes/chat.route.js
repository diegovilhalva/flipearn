import express from "express"
import {protect} from "../middlewares/auth.middleware.js"
import { getAllUserChats, getChat, sendChatMessage } from "../controllers/chat.controller.js"

const router = express.Router()

router.post("/",protect,getChat)
router.get("/user",protect,getAllUserChats)
router.post("/send-message",protect,sendChatMessage)


export default router