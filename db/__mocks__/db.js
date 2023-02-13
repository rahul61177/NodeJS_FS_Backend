const mongoose = require('mongoose');

const connect = async () => {
    console.log('MongoDB mocked connection');
};

const disconnect = async () => {
    console.log('Mocked disconnection');
};

const findUser = async (obj) => {
    return Promise.resolve({
        _id: mongoose.Types.ObjectId(),
        firstName: 'Rahul',
        lastName: 'Upadhyaya',
        address: '123 Main St',
        city: 'Orlando',
        state: 'FL',
        zipCode: '34256',
        email: 'rahul@gmail.com',
        password: '123',
    });
};

//obj = {email: req.body.email}
const saveUser = async (newUser) => {
    return Promise.resolve({
        _id: mongoose.Types.ObjectId(),
        firstName: 'Rahul',
        lastName: 'Upadhyaya',
        address: '123 Main St',
        city: 'Orlando',
        state: 'FL',
        zipCode: '34256',
        email: 'rahul@gmail.com',
        password: '123',
    });
};

module.exports = {connect, disconnect, findUser, saveUser};
