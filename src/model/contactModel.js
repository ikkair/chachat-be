const Pool = require("../config/db")

const selectAllContacts = () => {
  return Pool.query(`SELECT * FROM contacts ORDER BY contact_name ASC`)
}

const selectDetailContact = (queryId) => {
  return Pool.query("SELECT * FROM contacts WHERE id=$1", [queryId])
}

const insertContact = (queryObject) => {
  const { queryId, user_id, contact_phone, contact_name } = queryObject
  return Pool.query(
      `INSERT INTO contacts(id, user_id, contact_phone, contact_name) ` +
      `VALUES('${queryId}', '${user_id}', '${contact_phone}', '${contact_name}')`
  );
}

const updateContact = (queryObject) => {
  const { queryId, user_id, contact_phone, contact_name } = queryObject
  return Pool.query(
      `UPDATE contacts SET user_id='${user_id}',` +
      `contact_phone='${contact_phone}', contact_name='${contact_name}' WHERE id='${queryId}'`
  );
}

const deleteContact = (queryId) => {
  return Pool.query(`DELETE FROM contacts WHERE id='${queryId}'`)
}

module.exports = { 
  selectAllContacts,
  selectDetailContact,
  insertContact,
  updateContact,
  deleteContact
}