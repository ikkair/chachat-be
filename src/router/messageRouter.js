// Import express and router
const express = require("express")
const router = express.Router()

// Import controller functions
const messageController = require("../controller/messageController")

// Routes
router.get("/", messageController.getAllMessages)
router.get("/:id", messageController.getDetailMessage)
router.post("/", messageController.addMessage)
router.put("/:id",  messageController.editMessage)
router.delete("/:id", messageController.deleteMessage)

// Export
module.exports = router
