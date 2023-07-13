import { Router } from "express"

//import messagesManager from "../dao/fileManagers/messages.js"
import messagesManager from "../dao/dbManagers/messages.js"

const manejadorMensajes = new messagesManager()

const router = Router()

router.get("/", async (req, res) => {
    let messages = await manejadorMensajes.getAllMessages()
    res.render("chat", {messages})
})

export default router
