import React, { useState } from "react";
import "./NoticeListPage.css";

const dummyData = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  title: `예시 제목 ${i + 1}`,
  author: "홍길동",
  date: "2025-05-19",
}));

export default function NoticePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = dummyData.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(dummyData.length / postsPerPage);

  return (
    <div className="notice-container">
      <div className="notice-header">
        <div className="subject-info">
          <span className="subject-name">과목명</span>
          <span className="subject-code">/학정번호</span>
        </div>
        <button className="write-button">글쓰기</button>
      </div>

      <table className="notice-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>게시물 제목</th>
            <th>작성자</th>
            <th>작성일자</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, idx) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
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
