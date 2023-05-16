const Pool = require("../config/db")

const selectAllConversation = () => {
  return Pool.query(`SELECT * FROM conversations`)
}

const selectDetailConversation = (queryId) => {
  return Pool.query(`SELECT * FROM conversations WHERE id='${queryId}'`)
}

const selectConversationsByUserId = (queryId) => {
  return Pool.query(`SELECT * FROM conversations WHERE (user_id_1='${queryId}') OR (user_id_2='${queryId}')`)
}

const insertConversation = (queryObject) => {
  const { queryId, user_id_1, user_id_2} = queryObject
  return Pool.query(
      `INSERT INTO conversations(id, user_id_1, user_id_2)`+
      `VALUES('${queryId}', '${user_id_1}', '${user_id_2}')`
  );
}

const updateConversation = (queryObject) => {
  const { queryId, user_id_1, user_id_2 } = queryObject
  return Pool.query(
      `UPDATE conversations SET user_id_1='${user_id_1}', user_id_2='${user_id_2}'`+
      `WHERE id='${queryId}'`
  );
}

const deleteConversation = (queryId) => {
  return Pool.query(`DELETE FROM conversations WHERE id='${queryId}'`)
}

module.exports = { 
  selectAllConversation,
  selectDetailConversation,
  selectConversationsByUserId,
  insertConversation,
  updateConversation,
  deleteConversation
}