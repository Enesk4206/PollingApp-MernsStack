const multer = require("multer");
const path = require("path");

//configure storage

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);

    },
});


//File filter
const fileFilter = (req, file, cb) => {
    const allowTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Only .jpeg, .png, .jpg formats are allowed"),false)
    }
}

const upload = multer({ storage, fileFilter });
module.exports = upload;