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
    deleteBoard
};
