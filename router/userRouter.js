const express = require('express');

const router = express.Router();

router.post('/register', (req, res, next) => {
    //findUser
    //If the user exists
    //return response that says Email Exists try logging in
    //else
    //encrypt password
    //set the password with the encrypted password
    //save the user to the database
});

router.post('/login', (req, res) => {});

module.exports = router;
