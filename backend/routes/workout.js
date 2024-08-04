const express = require('express');
const router = express.Router();
const {
    createworkout,
    getallworkout,
    getworkout,
    deleteworkout,  
    updateworkout,

} =require('../controller/workoutcontrol')


const requireauth = require("../middleware/requireauth")

router.use(requireauth)

router.get('/',getallworkout)

router.get("/:id" , getworkout)

router.post("/" , createworkout)

router.delete("/:id" ,deleteworkout)

router.patch("/:id" , updateworkout)

module.exports = router