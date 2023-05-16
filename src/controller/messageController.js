// Import model
const messageModel = require("../model/messageModel")

// Import random id
const { v4: uuidv4 } = require("uuid")

// Import Helper for Template Response
const commonHelper = require("../helper/common")

const getAllMessages = async (req, res) => {
  try {
    const selectResult = await messageModel.selectAllMessages()
    if (selectResult.rowCount > 0) {
      return commonHelper.response(res, selectResult.rows, 200, "Get all messages success")
    } else {
      return commonHelper.response(res, null, 404, "No message available")
    }
  } catch (error) {
    console.log(error)
    return commonHelper.response(res, null, 500, "Failed to get all message")
  }

}

const getDetailMessage = async (req, res) => {
  // Set param id as const
  const queryId = req.params.id
  // Declare variable for holding query result
  let selectResult
  try {
    selectResult = await messageModel.selectDetailMessage(queryId)
  } catch (error) {
    console.log(error)
    return commonHelper.response(res, selectResult.rows, 500, "Failed to get detail message")
  }
  // Check the affected row
  if (selectResult.rowCount > 0) {
    return commonHelper.response(res, selectResult.rows, 200, "Get detail message success")
  } else {
    return commonHelper.response(res, selectResult.rows, 404, "Message not found")
  }
}

const addMessageManual = async (queryObject) => {
  // Generate Id
  queryObject.queryId = uuidv4()
  try {
    await messageModel.insertMessage(queryObject)
  } catch (error) {
    console.log(error)
  }
}


const addMessage = async (req, res) => {
  // Generate Id
  req.body.queryId = uuidv4()
  try {
    const insertResult = await messageModel.insertMessage(req.body)
    return commonHelper.response(res, insertResult.rows, 200, "Message added")
  } catch (error) {
    console.log(error)
    if (error.detail && error.detail.includes('is not present in table "users".')) {
      return commonHelper.response(res, null, 400, "Users id is not present in table users")
    } else if (error.detail && error.detail.includes('already exists')) {
      return commonHelper.response(res, null, 409, "Message already exist")
    } else {
      return commonHelper.response(res, null, 500, "Failed to add message")
    }
  }
}

const editMessage = async (req, res) => {
  // Set param id as const
  const queryId = req.params.id
  req.body.queryId = queryId
  try {
    const insertResult = await messageModel.updateMessage(req.body)
    if (insertResult.rowCount < 1) {
      return commonHelper.response(res, null, 404, "Message not found")
    }
    return commonHelper.response(res, insertResult.rows, 200, "Message edited")
  } catch (error) {
    console.log(error)
    if (error.detail && error.detail.includes('is not present in table "users".')) {
      return commonHelper.response(res, null, 400, "Users id is not present in table users")
    } else if (error.detail && error.detail.includes('already exists')) {
      return commonHelper.response(res, null, 409, "Message already exist")
    } else {
      return commonHelper.response(res, null, 500, "Failed to update message")
    }
  }
}

const deleteMessage = async (req, res) => {
  // Set param id as const
  const queryId = req.params.id
  // Declare variable for holding query result
  let deleteResult
  try {
    deleteResult = await messageModel.deleteMessage(queryId)
    if (deleteResult.rowCount < 1) {
      return commonHelper.response(res, null, 404, "Message not found")
    }
    return commonHelper.response(res, deleteResult.rows, 200, "Message deleted")
  } catch (error) {
    console.log(error)
    return commonHelper.response(res, null, 500, "Failed to delete message")
  }
}

module.exports = {
  getAllMessages,
  getDetailMessage,
  addMessage,
  addMessageManual,
  editMessage,
  deleteMessage
}