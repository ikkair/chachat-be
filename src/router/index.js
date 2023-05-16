// Import express and router
const express = require("express");
const router = express.Router();

// Import route
const userRouter = require("./userRouter");
const conversationRouter = require("./conversationRouter");
const contactRouter = require("./contactRouter");
const messageRouter = require("./messageRouter");

// Use route
router.use("/v1/users", userRouter);
router.use("/v1/conversations", conversationRouter);
router.use("/v1/contacts", contactRouter);
router.use("/v1/messages", messageRouter);

// Export router
module.exports = router;