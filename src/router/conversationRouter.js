// Import express and router
const express = require("express")
const router = express.Router()

// Import controller functions
const conversationController = require("../controller/conversationController")

// Routes
router.get("/", conversationController.getAllConversation)
router.get("/:id", conversationController.getDetailConversation)
router.get("/personal/:id", conversationController.getPersonalConversations)
router.post("/", conversationController.addConversation)
router.put("/:id",  conversationController.editConversation)
router.delete("/:id", conversationController.deleteConversation)

// Export
module.exports = router
