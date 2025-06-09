const express = require("express");
const router = express.Router();
const boardController = require("../../controllers/common/boardController");

const multer = require('multer');
const path = require("path");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../", "uploads")); // 파일 업로드 위치
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext); // 파일명
    }
})
var upload = multer({ storage: storage });

router.post('/write/:courseId/:boardType', upload.array('many'), boardController.insertBoard);

router.get('/read/attachment', boardController.getAttachment);

router.get('/download/:filename', boardController.downloadFile);

router.delete('/delete', boardController.deleteBoard);

module.exports = router;