require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/userModel');

const connect = async () => {
    await mongoose.connect(process.env.mongo, () => {
        console.log('MongoDB is up and running');
    });
};

const disconnect = async () => {
    await mongoose.connection.close();
};

const findUser = async (obj) => {
    User.findOne(obj);
};

//obj = {email: req.body.email}
const saveUser = async (newUser) => {
    return await newUser.save();
};

module.exports = {connect, disconnect, findUser, saveUser};
