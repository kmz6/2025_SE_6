import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import BoardHeader from "../../components/Board/BoardHeader";
import BoardListTable from "../../components/Board/BoardListTable";
import "./QnAListPage.css";

const dummyData = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  title: `예시 제목 ${i + 1}`,
  author: "홍길동",
  date: "2025-05-19",
}));

export default function QnAListPage() {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const userType = user?.user_type;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(dummyData);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const handleSearch = () => {
    const filtered = dummyData.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(filtered);
    setCurrentPage(1);
  };

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = searchResult.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(searchResult.length / postsPerPage);

  return (
    <div className="qna-container">
      <h1 className="board-title">Q&A 게시판</h1>

      <BoardHeader
        subjectName="[과목명]"
        subjectCode="[학정번호]"
        onWrite={() => navigate(`/qna/${lectureId}/write`)}
        isQnA={true} 
        userType={userType}
      />

      {/* 검색 입력 */}
      <div className="search-wrapper">
        <FaSearch size={20} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Q&A 게시판 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button className="search-button" onClick={handleSearch}>
          검색
        </button>
      </div>

      {/* 게시물 테이블 or 결과 없음 */}
      {currentPosts.length > 0 ? (
        <BoardListTable
          data={currentPosts}
          onRowClick={(postId) => navigate(`/qna/${lectureId}/${postId}`)}
        />
      ) : (
        <p className="no-result-message">검색 결과가 없습니다.</p>
      )}

      {/* 페이지네이션 */}
      {searchResult.length > 0 && (
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
      )}
    </div>
  );
}
