// const express = require('express');
// const router = express.Router()
const {loginuser,signupuser} = require('../controller/usercontrol')

// router.post('/login',login)


// router.post('/signup',signup)

const express = require('express');
const router = express.Router();

// Define routes here
router.post('/login', loginuser);
router.post('/signup', signupuser);

module.exports = router;
