const path = require("path");
const fs = require("fs");
const boardModel = require("../../models/common/boardModel");

// 게시글 등록하기
async function insertBoard(req, res) {
    const { courseId, boardType } = req.params;
    const { title, content, author_id } = req.body;

    const data = [courseId, title, content, author_id, boardType];
    const files = req.files;

    try {
        const result = await boardModel.insertById(data, files);
        return res.status(201).json({ message: "등록 성공" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

// 게시글 수정하기
async function updateBoard(req, res) {
    const { postId } = req.params;
    const { title, content } = req.body;
    const files = req.files;

    try {
        const affectedRows = await boardModel.updateById(title, content, files, postId);

        if (affectedRows === 0) {
            return res.status(404).json({ message: "수정할 게시글이 없습니다." });
        }
        return res.status(201).json({ message: "수정 성공" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

// 첨부파일 목록
async function getAttachment(req, res) {
    const postId = req.query.post_id;

    try {
        const result = await boardModel.getAttachById(postId);
        return res.json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

// 첨부파일 다운로드
async function downloadFile(req, res) {
    const { filename } = req.params;
    const filePath = path.join(__dirname, "../..", "uploads", filename);

    console.log(filePath);

    if (fs.existsSync(filePath)) {
        res.download(filePath, filename, (err) => {
            if (err) {
                console.error("파일 다운로드 실패:", err);
                res.status(500).send("파일 다운로드 중 오류가 발생했습니다.");
            }
        });
    } else {
        res.status(404).send("파일을 찾을 수 없습니다.");
    }
}

// 게시글 삭제하기
async function deleteBoard(req, res) {
    const postId = req.query.post_id;

    try {
        const result = await boardModel.deleteById(postId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "삭제할 게시글을 찾을 수 없습니다." });
        }

        return res.json({ message: "삭제 성공" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
}

module.exports = {
    insertBoard,
    updateBoard,
    getAttachment,
    downloadFile,
    deleteBoard
};
