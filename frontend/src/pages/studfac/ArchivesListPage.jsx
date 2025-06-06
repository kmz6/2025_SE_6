import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import BoardHeader from "../../components/Board/BoardHeader";
import BoardListTable from "../../components/Board/BoardListTable";
import axiosInstance from "../../apis/axiosInstance";
import "./ArchivesListPage.css";

export default function ArchivesListPage() {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const userType = user?.user_type;

  const [archives, setArchives] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");

  const postsPerPage = 10;

  const fetchArchives = async () => {
    try {
      const response = await axiosInstance.get(`/api/lectures/${lectureId}/materials`);
      setArchives(response.data || []);
      setSearchResult(response.data || []);
    } catch (error) {
      console.error("자료실 데이터를 불러오는 중 오류 발생:", error);
      console.log("상세:", error.response?.status, error.response?.data);
    }
  };

  const fetchCourseName = async () => {
    try {
      const response = await axiosInstance.get(`/api/lectures/${lectureId}/info`);
      setCourseName(response.data.course_name);
      setCourseCode(response.data.course_code);
    } catch (error) {
      console.error("과목명 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchArchives();
    fetchCourseName();
  }, [lectureId]);

  const handleSearch = () => {
    const filtered = archives.filter((post) =>
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
    <div className="archives-container">
      <h1 className="board-title">강의 자료실</h1>

      <BoardHeader
        subjectName={courseName}
        subjectCode={courseCode}
        onWrite={() => navigate(`/professor/archives/${lectureId}/write`)}
        userType={userType}
      />

      <div className="search-wrapper">
        <FaSearch size={20} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="자료 검색"
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

      {currentPosts.length > 0 ? (
        <BoardListTable
          data={currentPosts}
          onRowClick={(postId) => navigate(`/archives/${lectureId}/${postId}`)}
        />
      ) : (
        <p className="no-result-message">검색 결과가 없습니다.</p>
      )}

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
