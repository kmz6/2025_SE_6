const db = require("../../config/db");

async function findMemberByStaffId(staff_id) {
  const [rows] = await db.execute("SELECT * FROM STAFF_TB WHERE staff_id = ?", [
    staff_id,
  ]);
  return rows[0];
}

async function createMember(data) {
  const { staff_id, name, department, telephone, email } = data;

  const [userRows] = await db.execute(
    "SELECT * FROM USER_TB WHERE user_id = ?",
    [staff_id]
  );

  if (userRows.length === 0) {
    await db.execute(
      "INSERT INTO USER_TB (user_id, password, user_type) VALUES (?, ?, ?)",
      [staff_id, "1234", "staff"]
    );
  }

  const [result] = await db.execute(
    "INSERT INTO STAFF_TB (staff_id, name, department, telephone, email) VALUES (?, ?, ?, ?, ?)",
    [staff_id, name, department, telephone, email]
  );

  return result;
}

module.exports = {
  findMemberByStaffId,
  createMember,
};
