import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import { getCourseData, getStudentData } from "../../apis/grade/profGrade";
import ProfGrade from "../../components/GradeInput/ProfGrade";

function GradeInputPage() {
  const { user } = useUser();
  const { courseId } = useParams();
  const [targetCourse, setTargetCourse] = useState([]); // 과목 정보
  const [targetStudent, setTargetStudent] = useState([]); // 학생 정보

  useEffect(() => {
    if (!user) return; //user 없어도 계속 hook 호출

    const fetchCourseInfo = async () => {
      // 강의 정보 불러오기
      const courseInfo = await getCourseData(courseId);
      setTargetCourse(courseInfo);
    };

    const fetchStudentInfo = async () => {
      // 학생 정보 불러오기
      const studentInfo = await getStudentData(courseId);
      setTargetStudent(studentInfo);
    };

    fetchCourseInfo();
    fetchStudentInfo();
  }, [user]);

  return (
    <ProfGrade courseData={targetCourse} studentData={targetStudent} />
  );
}

export default GradeInputPage;
