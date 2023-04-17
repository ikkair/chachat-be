const Pool = require("../config/db")

const selectAllTickets = (queryObject) => {
  let conditional = ``
  if (queryObject && queryObject.id_passenger){
    conditional = `WHERE id_passenger='${queryObject.id_passenger}'`
  }
  return Pool.query(`SELECT * FROM tickets ${conditional} ORDER BY code ASC`)
}

const selectDetailTicket = (queryId) => {
  return Pool.query("SELECT * FROM tickets WHERE id=$1", [queryId])
}

const insertTicket = (queryObject) => {
  const { queryId, id_passenger, code } = queryObject
  return Pool.query(
      `INSERT INTO tickets(id, id_passenger, code) ` +
      `VALUES('${queryId}', '${id_passenger}', '${code}')`
  );
}

const updateTicket = (queryObject) => {
  const { queryId, id_passenger, code } = queryObject
  return Pool.query(
      `UPDATE tickets SET id_booking='${id_passenger}',` +
      `code='${code}' WHERE id='${queryId}'`
  );
}

const deleteTicket = (queryId) => {
  return Pool.query(`DELETE FROM tickets WHERE id='${queryId}'`)
}

module.exports = { 
  selectAllTickets,
  selectDetailTicket,
  insertTicket,
  updateTicket,
  deleteTicket
}