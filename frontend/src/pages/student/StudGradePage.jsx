import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import StudInfo from "../../components/StudInfo/StudInfo"
import { getSemester, getCourse } from "../../apis/studinfo/grade";
import * as S from "../../styles/StudGradePage.style";

import { gradePoints } from '../../constants/gradePoints';

const StudGradePage = () => {
  const { user } = useUser(); // user 정보

  const [semesters, setSemesters] = useState([]); // 학기 정보
  const [selectedSemester, setSelectedSemester] = useState(""); // 선택한 학기
  const [courses, setCourses] = useState([]); // 수강 과목 및 성적 정보
  const [creditInfo, setCreditInfo] = useState({ total: 0, major: 0, general: 0, gpa: 0 }); // 이수학점

  //학점 수, 평량 평균 계산
  const calculateCreditGpa = (courses) => {
    let totalCredit = 0; //전체
    let majorCredit = 0; //전공
    let generalCredit = 0; //교양
    let totalGradePoints = 0; //평량 평균

    courses.forEach((course) => {
      const credit = course.credit; //과목의 학점 수
      const grade = course.grade; //과목 성적

      //성적이 나온 과목들만 처리
      if (grade != "N/A") {
        if (course.course_type === "전공") {
          majorCredit += credit; //전공 학점 수
        } else if (course.course_type === "교양") {
          generalCredit += credit; //교양 학점 수
        }
        totalCredit += credit; //전체 학점 수
        totalGradePoints += (gradePoints[grade] ?? 0) * credit; //평량 평균
      }
    });

    totalGradePoints /= totalCredit;

    return { total: totalCredit, major: majorCredit, general: generalCredit, gpa: totalGradePoints };
  };

  // 학기 정보, 수강 과목 및 성적 정보 불러오기
  useEffect(() => {
    if (!user) return; //user 없어도 계속 hook 호출

    const fetchData = async () => {
      //학기 정보 불러오기
      const semData = await getSemester(user.user_id);
      setSemesters(semData);
      //가장 최근 학기로 설정
      if (semData.length > 0) {
        const defaultSemester = `${semData[0].course_year}-${semData[0].course_semester}`;
        setSelectedSemester(defaultSemester);
      }

      //수강 과목 및 성적 정보 불러오기
      const courseData = await getCourse(user.user_id);
      setCourses(courseData);

      //학점 수, 평량 평균 계산
      setCreditInfo(calculateCreditGpa(courseData));
    };
    fetchData();
  }, [user]);

  //학기별 과목 필터링
  const filteredCourses = courses.filter((course) => {
    const courseSemester = `${course.course_year}-${course.course_semester}`; // 과목의 학기
    return courseSemester === selectedSemester; // 선택된 학기와 같은 학기 과목만 반환
  })

  //정보를 불러오는 중인 경우
  if (!user) {
    return <div>로딩 중...</div>;
  }

  return (
    <S.Container>
      <S.Title>학습 결과</S.Title>
      <S.SubTitle>기본 정보</S.SubTitle>
      <StudInfo user_id={user.user_id}></StudInfo>

      <S.Table>
        <thead>
          <S.Row>
            <S.CellHead>전체 이수학점</S.CellHead>
            <S.CellHead>전공 이수학점</S.CellHead>
            <S.CellHead>교양 이수학점</S.CellHead>
            <S.CellHead>평량 평균</S.CellHead>
          </S.Row>
        </thead>
        <tbody>
          <S.Row>
            <S.Cell>{creditInfo.total}</S.Cell>
            <S.Cell>{creditInfo.major}</S.Cell>
            <S.Cell>{creditInfo.general}</S.Cell>
            <S.Cell>{creditInfo.gpa}</S.Cell>
          </S.Row>
        </tbody>
      </S.Table>

      <S.SubTitle>수강/성적 조회</S.SubTitle>
      <S.SelectWrapper>
        <S.SelectLabel htmlFor="semester">학기 선택 :</S.SelectLabel>
        <S.Select id="semester" value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
          {semesters.map((sem) => {
            const format = `${sem.course_year}-${sem.course_semester}`;
            return (
              <option key={format} value={format}>
                {format}
              </option>
            );
          })}
        </S.Select>
      </S.SelectWrapper>

      <S.Table>
        <thead>
          <S.Row>
            <S.CellHead>학정번호</S.CellHead>
            <S.CellHead>과목명</S.CellHead>
            <S.CellHead>이수구분</S.CellHead>
            <S.CellHead>학점</S.CellHead>
            <S.CellHead>성적</S.CellHead>
          </S.Row>
        </thead>
        <tbody>
          {filteredCourses.map((course) => (
            <S.Row key={course.course_id}>
              <S.Cell>{course.course_code}</S.Cell>
              <S.Cell>{course.course_name}</S.Cell>
              <S.Cell>{course.course_type}</S.Cell>
              <S.Cell>{course.credit}</S.Cell>
              <S.Cell>
                {course.grade === "N/A" //아직 성적이 없는 경우, 빈칸으로 표시
                  ? ""
                  : course.grade}
              </S.Cell>
            </S.Row>
          ))}
        </tbody>
      </S.Table>
    </S.Container>
  );
};

export default StudGradePage;
