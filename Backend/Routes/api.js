const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/auth');
const {User} =require("../DB/db") 

router.get( '/register', (req,res)=>{
  User.find().then((data)=>{
    res.send(data)
  })
});
// Signup route with validation
router.post('/signup', [
  check('name').notEmpty(),
  check('email').isEmail().normalizeEmail(),
  // check('password').isLength({ min: 6 })
], authController.signup);

// Login route
router.post('/login', authController.login);

module.exports = router;