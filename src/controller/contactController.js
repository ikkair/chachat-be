// Import model
const ticketModel = require("../models/ticketModel")

// Import random id
const {v4: uuidv4} = require("uuid")

// Import Helper for Template Response
const commonHelper = require("../helper/common")

const ticketController = {
  getAllTickets: async (req, res) => {
    // Setup conditional select
    let queryObject = {
      id_passenger : req.query.id_passenger
    }
    // Declare variable for holding query result
    let selectResult
    try {
      selectResult = await ticketModel.selectAllTickets(queryObject)
    } catch (error) {
      console.log(error)
      return commonHelper.response(res, null, 500, "Failed to get all tickets" )
    }
    return commonHelper.response(res, selectResult.rows, 200, "Get all tickets success" )
  },

  getDetailTicket: async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    // Declare variable for holding query result
    let selectResult
    try {
      selectResult = await ticketModel.selectDetailTicket(queryId)
    } catch (error) {
      console.log(error)
      return commonHelper.response(res, selectResult.rows, 500, "Failed to get detail ticket" )
    }
    // Check the affected row
    if (selectResult.rowCount > 0){
      return commonHelper.response(res, selectResult.rows, 200, "Get detail ticket success" )
    } else {
      return commonHelper.response(res, selectResult.rows, 404, "Ticket not found" )
    }
  },

  addTicket: async (req, res) => {
    // Generate Id
    req.body.queryId = uuidv4()
    try {
      const insertResult = await ticketModel.insertTicket(req.body)
      return commonHelper.response(res, insertResult.rows, 200, "Ticket added" )
    } catch (error) {
      console.log(error)
      if (error.detail && error.detail.includes('is not present in table "passengers".')){
        return commonHelper.response(res, null, 400, "Passenger id is not present in table passengers")
      }
      return commonHelper.response(res, null, 500, "Failed to add ticket" )
    }
  }, 

  editTicket: async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    req.body.queryId = queryId
    try {
      const insertResult = await ticketModel.updateTicket(req.body)
      if (insertResult.rowCount < 1){
        return commonHelper.response(res, null, 404, "Ticket not found" )
      }
      return commonHelper.response(res, insertResult.rows, 200, "Ticket edited" )
    } catch (error) {
      console.log(error)
      if (error.detail && error.detail.includes('is not present in table "passengers".')){
        return commonHelper.response(res, null, 400, "Passenger id is not present in table passengers")
      }
      return commonHelper.response(res, null, 500, "Failed to update ticket" )
    }
  },

  deleteTicket: async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    // Declare variable for holding query result
    let deleteResult
    try {
      deleteResult = await ticketModel.deleteTicket(queryId)
      if (deleteResult.rowCount < 1){
        return commonHelper.response(res, null, 404, "Ticket not found" )
      }
      return commonHelper.response(res, deleteResult.rows, 200, "Ticket deleted" )
    } catch (error) {
      console.log(error)
      return commonHelper.response(res, null, 500, "Failed to delete ticket" )
    }
  }
}

module.exports = ticketController