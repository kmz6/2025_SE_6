import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BoardHeader from "../components/Board/BoardHeader";
import BoardListTable from "../components/Board/BoardListTable";
import "./ArchivesListPage.css";

const dummyData = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  title: `예시 제목`,
  author: "홍길동",
  date: "2025-05-19",
}));

export default function ArchivesListPage() {
  const { lectureId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const navigate = useNavigate();

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = dummyData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(dummyData.length / postsPerPage);

  return (
    <div className="archives-container">
      <h1 className="board-title">강의 자료실</h1>

      <BoardHeader
        subjectName="[과목명]"
        subjectCode="[학정번호]"
        onWrite={() => navigate(`/archives/${lectureId}/write`)}
      />

      <BoardListTable
        data={currentPosts}
        onRowClick={(postId) => navigate(`/archives/${lectureId}/${postId}`)}
      />

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
