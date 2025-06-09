import axiosInstance from "../axiosInstance";

// 게시글 등록
export const insertBoard = async (courseId, boardType, formData) => {
    const response = await axiosInstance.post(`/write/board/${courseId}/${boardType}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

// 게시글 삭제
export const deleteBoard = async (postId) => {
    const response = await axiosInstance.delete(`/board/delete`, {
        params: { post_id: postId },
    });
    return response.data;
};