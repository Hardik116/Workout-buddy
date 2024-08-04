const mongoose = require("mongoose");
const User = require('../models/usermodel')
const jwt = require('jsonwebtoken');

const createtoken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET , {expiresIn:"3d"})
}

const loginuser=async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.login(email, password);

         //create token 
        const token = createtoken(user._id);


        // Send response only once
        res.status(200).json({ email, token});
    } catch (error) {
        // Send response only once
        res.status(400).json({ error: error.message });
    }
}

    const signupuser = async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.signup(email, password);

             //create token 
            const token = createtoken(user._id);


            // Send response only once
            res.status(200).json({ email, token});
        } catch (error) {
            // Send response only once
            res.status(400).json({ error: error.message });
        }
    };
module.exports={
    loginuser,
    signupuser
}