const express = require("express");
const {
    registerUser,loginUser,getUserInfo,
} = require("../controllers/authController.js");
const { protect } = require("../middleware/AuthMiddleware.js");
const upload =  require("../middleware/uploadMiddleware");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });

    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

module.exports = router;

