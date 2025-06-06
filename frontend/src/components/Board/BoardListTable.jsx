import React from "react";
import "./BoardListTable.css";

export default function BoardListTable({ data, onRowClick }) {
  return (
    <table className="board-table">
      <thead>
        <tr>
          <th>No.</th>
          <th>게시물 제목</th>
          <th>작성자</th>
          <th>작성일자</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td
              className="clickable-title"
              onClick={() => onRowClick(item.id)}
            >
              {item.title}
            </td>
            <td>{item.name}</td>
            <td>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
