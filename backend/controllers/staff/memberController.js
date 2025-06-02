const memberModel = require("../../models/staff/memberModel");

async function addMember(req, res) {
  try {
    const { staff_id, name, department, telephone, email } = req.body;

    const existing = await memberModel.findMemberByStaffId(staff_id);
    if (existing) {
      return res.status(400).json({ error: "이미 존재하는 사번입니다." });
    }

    await memberModel.createMember({
      staff_id,
      name,
      department,
      telephone,
      email,
    });

    res.status(201).json({ message: "구성원이 추가되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
}

async function deleteMember(req, res) {
  try {
    const { staffId } = req.params;
    console.log("삭제 요청 사번:", staffId);

    const existing = await memberModel.findMemberByStaffId(staffId);

    if (!existing) {
      return res.status(404).json({ error: "존재하지 않는 사번입니다." });
    }

    await memberModel.deleteMemberByStaffId(staffId);

    res.status(200).json({ message: "구성원이 삭제되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
}

module.exports = {
  addMember,
  deleteMember,
};
