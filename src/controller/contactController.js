// Import model
const contactModel = require("../model/contactModel")

// Import random id
const { v4: uuidv4 } = require("uuid")

// Import Helper for Template Response
const commonHelper = require("../helper/common")

const getAllContact = async (req, res) => {
  try {
    const selectResult = await contactModel.selectAllContacts()
    if (selectResult.rowCount > 0) {
      return commonHelper.response(res, selectResult.rows, 200, "Get all contacts success")
    } else {
      return commonHelper.response(res, null, 404, "No contact available")
    }
  } catch (error) {
    console.log(error)
    return commonHelper.response(res, null, 500, "Failed to get all contact")
  }

}

const getDetailContact = async (req, res) => {
  // Set param id as const
  const queryId = req.params.id
  // Declare variable for holding query result
  let selectResult
  try {
    selectResult = await contactModel.selectDetailContact(queryId)
  } catch (error) {
    console.log(error)
    return commonHelper.response(res, selectResult.rows, 500, "Failed to get detail contact")
  }
  // Check the affected row
  if (selectResult.rowCount > 0) {
    return commonHelper.response(res, selectResult.rows, 200, "Get detail contact success")
  } else {
    return commonHelper.response(res, selectResult.rows, 404, "Contact not found")
  }
}

const addContact = async (req, res) => {
  // Generate Id
  req.body.queryId = uuidv4()
  try {
    const insertResult = await contactModel.insertContact(req.body)
    return commonHelper.response(res, insertResult.rows, 200, "Contact added")
  } catch (error) {
    console.log(error)
    if (error.detail && error.detail.includes('is not present in table "users".')) {
      return commonHelper.response(res, null, 400, "Users id is not present in table users")
    } else if (error.detail && error.detail.includes('already exists')) {
      return commonHelper.response(res, null, 409, "Contact already exist")
    } else {
      return commonHelper.response(res, null, 500, "Failed to add contact")
    }
  }
}

const editContact = async (req, res) => {
  // Set param id as const
  const queryId = req.params.id
  req.body.queryId = queryId
  try {
    const insertResult = await contactModel.updateContact(req.body)
    if (insertResult.rowCount < 1) {
      return commonHelper.response(res, null, 404, "Contact not found")
    }
    return commonHelper.response(res, insertResult.rows, 200, "Contact edited")
  } catch (error) {
    console.log(error)
    if (error.detail && error.detail.includes('is not present in table "users".')) {
      return commonHelper.response(res, null, 400, "Users id is not present in table users")
    } else if (error.detail && error.detail.includes('already exists')) {
      return commonHelper.response(res, null, 409, "Contact already exist")
    } else {
      return commonHelper.response(res, null, 500, "Failed to update contact")
    }
  }
}

const deleteContact = async (req, res) => {
  // Set param id as const
  const queryId = req.params.id
  // Declare variable for holding query result
  let deleteResult
  try {
    deleteResult = await contactModel.deleteContact(queryId)
    if (deleteResult.rowCount < 1) {
      return commonHelper.response(res, null, 404, "Contact not found")
    }
    return commonHelper.response(res, deleteResult.rows, 200, "Contact deleted")
  } catch (error) {
    console.log(error)
    return commonHelper.response(res, null, 500, "Failed to delete contact")
  }
}

module.exports = {
  getAllContact,
  getDetailContact,
  addContact,
  editContact,
  deleteContact
}