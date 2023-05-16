const Pool = require("../config/db")

const selectAllMessages = () => {
  return Pool.query(`SELECT * FROM messages ORDER BY sent_at DESC`)
}

const selectDetailMessage = (queryId) => {
  return Pool.query("SELECT * FROM messages WHERE room_id=$1", [queryId])
}

const insertMessage = (queryObject) => {
  const { queryId, room_id, sender_id, message } = queryObject
  return Pool.query(
      `INSERT INTO messages(id, room_id, sender_id, message) ` +
      `VALUES('${queryId}', '${room_id}', '${sender_id}', '${message}')`
  );
}

const updateMessage = (queryObject) => {
  const { queryId, messages} = queryObject
  return Pool.query(
      `UPDATE messages SET messages='${messages}'` +
      `WHERE id='${queryId}'`
  );
}

const deleteMessage = (queryId) => {
  return Pool.query(`DELETE FROM messages WHERE id='${queryId}'`)
}

module.exports = { 
  selectAllMessages,
  selectDetailMessage,
  insertMessage,
  updateMessage,
  deleteMessage
}