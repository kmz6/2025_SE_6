const db = require("../config/db");

//입력 받은 아이디를 TABLE에서 찾음
async function findUser(user_id, password) {
    const sql = 'SELECT * FROM user_tb WHERE user_id = ? and password = ?';
    const [results] = await db.query(sql, [user_id, password]);
    return results[0];
}

module.exports = {
    findUser,
};