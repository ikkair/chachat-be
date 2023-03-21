// Import JWT
const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
    const verifyOpts = {
        expiresIn: "1h",
        issuer: "chachat",
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, verifyOpts);
    return token;
};

const generateRefreshToken = (payload) => {
    const verifyOpts = {
        expiresIn: "1d",
        issuer: "chachat",
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, verifyOpts);
    return token;
};

module.exports = { generateToken, generateRefreshToken };
