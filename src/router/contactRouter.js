// Import express and router
const express = require("express")
const router = express.Router()

// Import controller functions
const contactController = require("../controller/contactController")

// Routes
router.get("/", contactController.getAllContact)
router.get("/:id", contactController.getDetailContact)
router.post("/", contactController.addContact)
router.put("/:id",  contactController.editContact)
router.delete("/:id", contactController.deleteContact)

// Export
module.exports = router
