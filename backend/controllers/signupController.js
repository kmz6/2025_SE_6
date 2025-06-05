const signupModel = require("../models/signupModel");

async function userSignup(req, res) {
    const {
        user_id,
        password,
        user_type,
        name,
        college,
        department,
        telephone,
        email,
        enrollment_status // 학생인 경우만
    } = req.body;

    console.log("회원가입 요청 데이터:", req.body);

    try {
        // USER_TB에 삽입
        await signupModel.insertUser(user_id, password, user_type);

        // 학생 또는 교수 분기
        if (user_type === 'student') {
            await signupModel.insertStudent(user_id, name, enrollment_status || 'enrolled', college, department, telephone, email);
        } else if (user_type === 'faculty') {
            await signupModel.insertFaculty(user_id, name, college, department, telephone, email);
        }

        return res.status(201).json({ message: "회원가입 성공!" });

    } catch (error) {
        console.error("[회원가입 오류]", error);
        return res.status(500).json({ message: "회원가입 중 서버 오류가 발생했습니다." });
    }
}

module.exports = {
    userSignup,
};