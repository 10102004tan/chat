const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { UnauthorizedError } = require("../cores/error.response");

const protectRoute = async (req, res, next) => {
    try {

        // get token from cookies
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const generateToken = async (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return token;
};



/**
 * This is a function to handle async function
 * @param {*} fn 
 * @returns 
 */
const asynHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
}

module.exports = {
    protectRoute,
    generateToken,
    asynHandler
};