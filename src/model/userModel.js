// Import database config from config folder
const pool = require("../config/db");

// Function to query all or search table
function selectAllUser() {
    return pool.query(
        `SELECT * FROM users`
    );
}

// Function to get record from id
function selectUser(queryId) {
    return pool.query(`SELECT * FROM users WHERE id='${queryId}'`);
}

// Function to insert
function insertUser(queryObject) {
    const { queryPwd, queryId, name, email, phone } = queryObject;
    return pool.query(
        `INSERT INTO users(id, name, email, phone, password) ` +
        `VALUES('${queryId}', '${name}', '${email}', '${phone}', '${queryPwd}')`
    );
}

// Function to update record
function updateUser(queryObject) {
    const { queryId, name, email, phone, queryFilename } =   queryObject;
    return pool.query(
        `UPDATE users SET name='${name}', email='${email}',` +
        `phone='${phone}', photo='${queryFilename}' WHERE id='${queryId}'`
    );
}

// Function to delete record from id
function deleteUser(queryId) {
    return pool.query(`DELETE FROM users WHERE id='${queryId}'`);
}

// Function to select from email
function selectUserEmail(email) {
    return pool.query(`SELECT * FROM users WHERE email='${email}'`);
}

module.exports = {
    selectAllUser,
    selectUser,
    insertUser,
    deleteUser,
    updateUser,
    selectUserEmail,
};
