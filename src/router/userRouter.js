// Import express and router
const express = require("express");
const router = express.Router();

// Import controller functions
const userController = require("../controller/userController.js");
const upload = require("../middleware/upload.js");

// Import auth
const authMiddleware = require("../middleware/auth");

// Route link to controller
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getDetailUser);
router.post("/register", upload.none(), userController.registerUser);
router.post("/refresh-token", userController.refreshToken);
router.put(
    "/:id",
    authMiddleware.protect,
    upload.single("photo"),
    userController.updateUser
);
router.delete(
    "/:id",
    authMiddleware.protect,
    userController.deleteUser
);
router.post("/login", userController.loginUser);

// Export router to index.js at router folder
module.exports = router;
