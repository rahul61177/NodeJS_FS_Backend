const {findUser, saveUser} = require('../db/db');
const errorTemplate = require('../templates/errorTemplate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const User = require('../models/userModel');
const mongoose = require('mongoose');

exports.registerUser = async (req, res) => {
    try {
        //findUser
        const user = await findUser({email: req.body.email});

        //If the user exists
        if (user) {
            //throw error
            throw new Error('User exists, try logging in');
        } else {
            //map our req.body to our user model
            const user = new User();
            user._id = mongoose.Types.ObjectId();
            const newUser = Object.assign(user, req.body);
            //encrypt password
            const hash = await bcrypt.hash(newUser.password, 10);
            //set the password with the encrypted password
            newUser.password = hash;
            //save the user to the database
            const savedUser = await saveUser(newUser);

            return res.status(201).json({
                message: 'Successful Registration!',
                user: savedUser,
            });
        }
    } catch (e) {
        return errorTemplate(res, e, e.message);
    }
};

exports.loginUser = async (req, res) => {
    try {
        //find the user returns a user
        const loggedUser = await findUser({email: req.body.email});

        //if the user is NOT Found
        //return response stating authentication failed
        if (!loggedUser) {
            throw new Error('Authentication Failed: Unable to find user');
        } else {
            //use bcrypt to compare passwords
            const result = await bcrypt.compare(
                req.body.password,
                loggedUser.password,
            );
            //if result
            if (result) {
                loggedUser.password = null;
                //create a JSON Web Token
                const token = jwt.sign(
                    {user: loggedUser},
                    process.env.jwt_secret,
                );
                //return response stating authentication successful, token, logged:true
                return res.status(201).json({
                    user: loggedUser,
                    logged: true,
                    token: token,
                    message: 'Login Successful',
                });
            } else {
                //return response authentication failed
                throw new Error(
                    'Authentication Failed: Email or password does not match',
                );
            }
        }
    } catch (e) {
        return errorTemplate(res, e, e.message);
    }
};
