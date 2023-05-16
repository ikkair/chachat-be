// Import models
const userModel = require("../model/userModel");

// Import jwt
const jwt = require("jsonwebtoken");

// Import hash
const bcrypt = require("bcryptjs");

// Import random id
const { v4: uuidv4 } = require("uuid");

// Import Helper for Template Response
const commonHelper = require("../helper/common");

// Import Helper for authentication
const authHelper = require("../helper/auth");
const {
    updatePhoto,
    uploadPhoto,
    deletePhoto,
} = require("../config/googleDrive.config");

// Function to get all or search from databas
const getAllUsers = async (req, res) => {
    try {
        const selectResult = await userModel.selectAllUser()
        return commonHelper.response(res, selectResult.rows, 200, "Get all users success");
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Get all users failed");
    }
};

// Function to get detail based on id
const getDetailUser = async (req, res) => {
    // Taking params as const
    const queryId = req.params.id;
    // Error handling for query database
    try {
        // Calling select from model and then display
        const result = await userModel.selectUser(queryId);
        // Conditional if database return no item
        if (result.rowCount < 1) {
            return commonHelper.response(res, null, 404, "No data user found");
        }
        return commonHelper.response(
            res,
            result.rows,
            200,
            "Get detail user successful"
        );
    } catch (err) {
        console.log(err);
        return commonHelper.response(res, null, 500, "Failed to get data user");
    }
};

// Function to create
const registerUser = async (req, res) => {
    // Creating hash password
    const salt = bcrypt.genSaltSync(10);
    req.body.queryPwd = bcrypt.hashSync(req.body.password, salt);
    // Creating random id
    req.body.queryId = uuidv4();
    // Email lowecase
    req.body.email = req.body.email.toLowerCase();
    try {
        const insertResult = userModel.insertUser(req.body)
        return commonHelper.response(res, insertResult, 201, "User registered");
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Register failed");
    }
};

//   Function to update
const updateUser = async (req, res) => {
    // Set param id as const
    const queryId = req.params.id
    req.body.queryId = queryId
    // Declare variable for holding query result
    let selectResult
    try {
        selectResult = await userModel.selectUser(queryId)
        if (selectResult.rowCount < 1) {
            return commonHelper.response(res, null, 404, "User not found")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to get data user")
    }
    // Update the old photo
    const oldPhoto = selectResult.rows[0].photo;
    if (req.file) {
        try {
            if (oldPhoto != "undefined" && oldPhoto != "photo.jpg" && oldPhoto != "") {
                const oldPhotoId = oldPhoto.split("=")[1];
                const updateResult = await updatePhoto(
                    req.file,
                    oldPhotoId
                );
                const parentPath = process.env.GOOGLE_DRIVE_PHOTO_PATH;
                req.body.queryFilename = parentPath.concat(updateResult.id);
            } else {
                const uploadResult = await uploadPhoto(req.file);
                const parentPath = process.env.GOOGLE_DRIVE_PHOTO_PATH;
                req.body.queryFilename = parentPath.concat(uploadResult.id);
            }
        } catch (error) {
            console.log(error)
            console.log(req.file)
            return commonHelper.response(res, null, 500, "Failed to update user photo")
        }
    } else {
        req.body.queryFilename = oldPhoto
    }
    // Update other field
    try {
        const updateResult = await userModel.updateUser(req.body)
        return commonHelper.response(res, updateResult.rows, 200, "User edited")
    } catch (error) {
        console.log(error)
        if (error.detail && error.detail.includes('already exists.')) {
            return commonHelper.response(res, null, 400, "User name already exist")
        } else {
            return commonHelper.response(res, null, 500, "Failed to update user")
        }
    }


};

// Function to delete
const deleteUser = async (req, res) => {
    const paramId = req.params.id
    try {
        const deleteResult = await userModel.deleteUser(paramId)
        if (deleteResult.rowCount < 1){
            return commonHelper.response(res, null, 500, "User not found");
        }
        return commonHelper.response(res, deleteResult.rows, 200, "Delete user success");
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to delete user");
    }
};

const loginUser = async (req, res) => {
    let selectResult
    try {
        selectResult = await userModel.selectUserEmail(req.body.email.toLowerCase())
        if (selectResult.rowCount < 1) {
            return commonHelper.response(res, null, 404, "Email not found")
        }
    } catch (error) {
        console.log(error)
        return commonHelper.response(res, null, 500, "Failed to get detail email")
    }
    // Check password
    const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        selectResult.rows[0].password
    )
    delete selectResult.rows[0].password
    if(!isPasswordValid){
        return commonHelper.response(res, null, 400, "Password invalid")
    }
    const payload = {
        id: selectResult.rows[0].id,
    };
    const token = authHelper.generateToken(payload);
    const refreshToken = authHelper.generateRefreshToken(payload);
    selectResult.rows[0].token = token
    selectResult.rows[0].refreshToken = refreshToken
    return commonHelper.response(res, selectResult.rows, 200, "Login success")

};

const refreshToken = (req, res) => {
    let decoded;
    try {
        decoded = jwt.verify(req.body.refreshToken, process.env.SECRET_KEY_JWT);
    } catch (error) {
        if (error && error.name === "JsonWebTokenError") {
            return commonHelper.response(res, null, 401, "Token invalid");
        } else if (error && error.name === "TokenExpiredError") {
            return commonHelper.response(res, null, 401, "Token expired");
        } else {
            return commonHelper.response(res, null, 401, "Token not active");
        }
    }
    let payload = {
        email: decoded.email,
        id: decoded.id,
    };
    const result = {
        token: authHelper.generateToken(payload),
        refreshToken: authHelper.generateRefreshToken(payload),
    };
    return commonHelper.response(res, [result], 200, "Token refreshed");
};

module.exports = {
    getAllUsers,
    getDetailUser,
    registerUser,
    deleteUser,
    updateUser,
    loginUser,
    refreshToken,
};
