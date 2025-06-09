import axiosInstance from "../axiosInstance";

// 게시글 등록
export const insertBoard = async (courseId, boardType, formData) => {
    const response = await axiosInstance.post(`/board/write/${courseId}/${boardType}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

// 게시글 수정
export const patchBoard = async (postId, formData) => {
    const response = await axiosInstance.patch(`/board/update/${postId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

// 첨부파일 불러오기
export const getAttachment = async (postId) => {
    const response = await axiosInstance.get(`/board/read/attachment`, {
        params: { post_id: postId },
    });
    return response.data;
}

// 첨부파일 다운로드
export const getDownLoad = async (filename) => {
    const response = await axiosInstance.get(`/board/download/${filename}`,
        { responseType: "blob" }
    );
    return response.data;
}

// 게시글 삭제
export const deleteBoard = async (postId) => {
    const response = await axiosInstance.delete(`/board/delete`, {
        params: { post_id: postId },
    });
    return response.data;
};