import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import StudInfo from "../../components/StudInfo/StudInfo"
import LineChart from "../../components/Chart/LineChart";
import BarChart from "../../components/Chart/BarChart";
import { getSemester, getCourse, getCredits, getGpas, getGradeCount } from "../../apis/grade/studGrade";
import * as S from "../../styles/StudGradePage.style";

const gradeOrder = ['A+', 'A0', 'B+', 'B0', 'C+', 'C0', 'D+', 'D0', 'F']; // 순서

const StudGradePage = () => {
  const { user } = useUser(); // user 정보

  const [semesters, setSemesters] = useState([]); // 학기 정보
  const [selectedSemester, setSelectedSemester] = useState(""); // 선택한 학기
  const [courses, setCourses] = useState([]); // 수강 과목 및 성적 정보
  const [credits, setCredits] = useState([]); // 학점 수
  const [gpa, setGpa] = useState({ gpa: 0 }); // 이수학점
  const [gpaList, setGpaList] = useState([]); // 학기별 평량평균
  const [gradeCount, setGradeCount] = useState([]); // 학점별 수

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

      // 학점 수 정보
      const creditInfo = await getCredits(user.user_id);
      const majorCredit = Number(creditInfo.find(c => c.course_type === "전공")?.total_credit) || 0; // 전공 학점
      const generalCredit = Number(creditInfo.find(c => c.course_type === "교양")?.total_credit) || 0; // 교양 학점

      setCredits({
        major: majorCredit,
        general: generalCredit,
        total: majorCredit + generalCredit
      });

      //학기별, 전체 평량 평균 정보
      const { courses, overallGpa } = await getGpas(user.user_id);
      setGpa({ gpa: overallGpa });
      setGpaList(courses);

      //학점별 수 정보
      const gradeCounts = await getGradeCount(user.user_id);
      setGradeCount(gradeCounts);
    };
    fetchData();
  }, [user]);

  //학기별 과목 필터링
  const filteredCourses = courses.filter((course) => {
    const courseSemester = `${course.course_year}-${course.course_semester}`; // 과목의 학기
    return courseSemester === selectedSemester; // 선택된 학기와 같은 학기 과목만 반환
  })

  //정보를 불러오는 중인 경우
  if (!user || !gpaList || !gradeCount) {
    return <div>로딩 중...</div>;
  }

  // 정렬 (평점)
  const sortedGpaList = [...gpaList].sort((a, b) => {
    const [yearA, semA] = a.semester.split('-').map(Number);
    const [yearB, semB] = b.semester.split('-').map(Number);

    if (yearA !== yearB) return yearA - yearB;
    return semA - semB;
  });

  // 정렬 (학점)
  const sortedGradeList = [...gradeCount].sort((a, b) => {
    return gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade);
  });

  const lineLabels = sortedGpaList.map(c => c.semester);
  const lineScores = sortedGpaList.map(c => parseFloat(c.gpa));

  const barLabels = sortedGradeList.map(g => g.grade);
  const total = sortedGradeList.reduce((acc, cur) => acc + cur.count, 0);
  const barScores = sortedGradeList.map(g => (g.count / total) * 100);

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
            <S.Cell>{credits.total}</S.Cell>
            <S.Cell>{credits.major}</S.Cell>
            <S.Cell>{credits.general}</S.Cell>
            <S.Cell>{gpa.gpa}</S.Cell>
          </S.Row>
        </tbody>
      </S.Table>

      <S.ChartWrapper>
        <LineChart labels={lineLabels} scores={lineScores} />
        <BarChart labels={barLabels} scores={barScores} />
      </S.ChartWrapper>

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
                  ? "-"
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
