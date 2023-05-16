// Import model
const conversationModel = require("../model/conversationModel")
const userModel = require("../model/userModel")

// Import random id
const { v4: uuidv4 } = require("uuid")

// Import Helper for Template Response
const commonHelper = require("../helper/common")

const getAllConversation = async (req, res) => {
    try {
        const selectResult = await conversationModel.selectAllConversation()
        if (selectResult.rowCount > 0) {
            return commonHelper.response(res, selectResult.rows, 200, "Get all conversation success")
        } else {
            return commonHelper.response(res, null, 404, "No conversation available")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to get all conversation")
    }
}

const getDetailConversation = async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    try {
        const selectResult = await conversationModel.selectDetailConversation(queryId)
        // Check the affected row
        if (selectResult.rowCount > 0) {
            return commonHelper.response(res, selectResult.rows, 200, "Get detail conversation success")
        } else {
            return commonHelper.response(res, selectResult.rows, 404, "Conversation not found")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to get detail conversation")
    }
}

const getPersonalConversations = async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    try {
        const selectResult = await conversationModel.selectConversationsByUserId(queryId)
        // Check the affected row
        if (selectResult.rowCount > 0) {
            // console.log(selectResult.rows)
            let tempArr = []
            await Promise.all(selectResult.rows.map(async (element) => {
                if (element.user_id_1 === queryId) {
                    const teman = await userModel.selectUser(element.user_id_2)
                    delete teman.rows[0].password
                    tempArr.push({
                        id: element.id,
                        friend: teman.rows[0]
                    })
                } else {
                    const teman = await userModel.selectUser(element.user_id_1)
                    delete teman.rows[0].password
                    tempArr.push({
                        id: element.id,
                        friend: teman.rows[0]
                    })
                }
            }))
            return commonHelper.response(res, tempArr, 200, "Get detail conversation success")
        } else {
            return commonHelper.response(res, selectResult.rows, 404, "Conversation not found")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to get detail conversation")
    }
}

const addConversation = async (req, res) => {
    // Generate Id
    req.body.queryId = uuidv4()
    try {
        const insertResult = await conversationModel.insertConversation(req.body)
        return commonHelper.response(res, insertResult.rows, 200, "Conversation added")
    } catch (error) {
        console.log(error)
        if (error.detail && error.detail.includes('is not present in table "users".')) {
            return commonHelper.response(res, null, 400, "Users id is not present in table users")
        } else {
            return commonHelper.response(res, null, 500, "Failed to add conversation")
        }
    }
}

const editConversation = async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    req.body.queryId = queryId
    // Update other field
    try {
        const updateResult = await conversationModel.updateConversation(req.body)
        if (updateResult.rowCount > 0) {
            return commonHelper.response(res, updateResult.rows, 200, "Conversation edited")
        } else {
            return commonHelper.response(res, null, 404, "Conversation not found")
        }
    } catch (error) {
        console.log(error)
        if (error.detail && error.detail.includes('is not present in table "users".')) {
            return commonHelper.response(res, null, 400, "User id is not present in table users")
        } else {
            return commonHelper.response(res, null, 500, "Failed to update conversation")
        }
    }
}

const deleteConversation = async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    try {
        const deleteResult = await conversationModel.deleteConversation(queryId)
        if (deleteResult.rowCount > 0) {
            return commonHelper.response(res, deleteResult.rows, 200, "Conversation deleted")
        } else {
            return commonHelper.response(res, null, 404, "Conversation not found")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to delete conversation")
    }
}

module.exports = {
    getAllConversation,
    getDetailConversation,
    getPersonalConversations,
    addConversation,
    editConversation,
    deleteConversation
}