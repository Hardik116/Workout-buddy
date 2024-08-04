const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

const requireauth = async (req, res, next) => {
    // Get authorization header
    const { authorization } = req.headers;

    // Check if authorization header is present
    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    // Extract token from the header
    const token = authorization.split(' ')[1];

    // Check if token is present
    if (!token) {
        return res.status(401).json({ error: "Token must be in the format: 'Bearer <token>'" });
    }

    try {
        // Verify the token
        const { _id } = jwt.verify(token, process.env.SECRET);

        // Find user by ID and attach to request
        req.user = await User.findOne({ _id }).select("_id");
        
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Request is not authorized" });
    }
};

module.exports = requireauth;
