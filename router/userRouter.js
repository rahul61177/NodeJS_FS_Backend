const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const {findUser, saveUser} = require('../db/db');
const mongoose = require('mongoose');

const router = express.Router();

router.post('/register', (req, res, next) => {
    //findUser
    findUser({email: req.body.email})
        .then((user) => {
            //If the user exists
            if (user) {
                //return response that says Email Exists try logging in
                res.status(409).json({message: 'User exists, try logging in'});
            } else {
                //map our req.body to our user model
                const user = new User();
                user._id = mongoose.Types.ObjectId();
                const newUser = Object.assign(user, req.body);
                //encrypt password
                bcrypt.hash(newUser.password, 10, function (err, hash) {
                    if (err) {
                        return res
                            .status(501)
                            .json({message: 'Error:' + err.message});
                    } else {
                        //set the password with the encrypted password
                        newUser.password = hash;
                        //save the user to the database
                        saveUser(newUser)
                            .then((user) => {
                                return res.status(201).json({
                                    message: 'Successful Registration!',
                                    user: user,
                                });
                            })
                            .catch((err) => {
                                error: {
                                    message: err.message;
                                }
                            });
                    }
                });
            }
        })
        .catch((err) => {
            error: {
                message: err.message;
            }
        });
});

router.post('/login', (req, res) => {});

module.exports = router;
