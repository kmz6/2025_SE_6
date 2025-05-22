import React, { useState } from "react";

import { useParams } from 'react-router-dom';
import ProfGrade from "../components/GradeInput/ProfGrade";

import {
    courseData
} from "../mocks/courseData";

//강의 번호에 해당하는 과목 찾기
function findCourseById(courseArray, targetCourseId) {
    return courseArray.find(item => item.course_id === targetCourseId);
}

//해당 강의를 듣는 학생 찾기 (우선은 임의의 배열 반환하도록 설정)
function findStudentById(targetCourseId) {
    const targetStudentData = [
        {
            student_id: "2022202063",
            name: "농담곰",
            college: "인공지능융합대학",
            department: "컴퓨터정보공학부"
        },
        {
            student_id: "2023202002",
            name: "소두곰",
            college: "인공지능융합대학",
            department: "컴퓨터정보공학부"
        },
        {
            student_id: "2021202010",
            name: "하츄핑",
            college: "인공지능융합대학",
            department: "컴퓨터정보공학부"
        }
    ];
    return targetStudentData;
}

function GradeInputPage() {
    const { courseId } = useParams();
    const targetCourseData = findCourseById(courseData, Number(courseId));
    const targetStudentData = findStudentById(Number(courseId));
    console.log("강의 제목 : ", targetCourseData.course_name);

    return <ProfGrade
        courseData={targetCourseData}
        studentData={targetStudentData} />;
}

export default GradeInputPage;