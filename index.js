// Import environtment variable
require("dotenv").config();

// Import model
const conversationModel = require("./src/model/conversationModel")

// Import Controller
const messageController = require("./src/controller/messageController")

// Import
const mainRouter = require("./src/router/index"); // Import main router
const express = require("express"); // Import express library
const helmet = require("helmet"); // Import helmet
const cors = require("cors"); // Import cors
const morgan = require("morgan"); // Import morgan
const xss = require("xss-clean"); // Import xsss
const { createServer } = require("http") 
const { Server } = require("socket.io")
const app = express(); // Import express
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
const commonHelper = require("./src/helper/common");

// Use middleware
app.use(express.json());
app.use(cors({
    methods: ["GET","PUT","POST","DELETE"]
}));
app.use(morgan("dev"));
app.use(helmet());
app.use(xss());
app.use("/img", express.static("src/upload"));

// Port choice
const port = process.env.PORT || 443;

// use Main Router
app.use("/", mainRouter);
app.all("*", (req, res, next) => {
    next(commonHelper.response(res, null, 404, "URL not Found"));
});

//Error code and message
app.use((err, req, res, next) => {
    if (err && err.message === "File too large"){
        return commonHelper.response(res, null, 413, "Image size too large (Max 2MB)")
    }
    const messageError = err.message || "Internal server error";
    const statusCode = err.status || 500;
    res.status(statusCode).json(err)
})

io.on("connection", async (socket) => {
    console.log(socket.request._query["id"])
    conversationModel.selectConversationsByUserId(socket.request._query["id"])
        .then((res)=>{
            res.rows.map((element)=>{
                socket.join(element.id)
            })
        })
    socket.on("disconnect", ()=>{
        console.log(`${socket.id} is disconnecting`)
    })
    socket.on("sendMessage", ({message, sender_id, room_id})=>{
        io.to(`${room_id}`).emit("receiveMessage", {message, sender_id})
        messageController.addMessageManual({message, sender_id, room_id})
    })
});

// Listening port awaiting requests
httpServer.listen(port, () => {
    console.log(`Server run on port: ${port}`);
});