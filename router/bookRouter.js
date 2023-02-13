const express = require('express');
const router = express.Router();

//http://localhost:3001/users
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'SUCCESSFUL - GET',
        metadata: {
            hostname: req.hostname,
            method: req.method,
        },
    });
});

//http://localhost:3001/users/34
router.get('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'SUCCESSFUL - GET by ID',
        metadata: {
            id: req.params.id,
            method: req.method,
            hostname: req.hostname,
        },
    });
});

//http://localhost:3001/users
router.post('/', (req, res, next) => {
    const name = req.body.name;
    res.status(201).json({
        message: 'SUCCESSFUL - POST',
        metadata: {
            name: name,
            hostname: req.hostname,
            method: req.method,
        },
    });
});

//http://localhost:3001/users/34
router.put('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'SUCCESSFUL - PUT by ID',
        metadata: {
            id: req.params.id,
            method: req.method,
            hostname: req.hostname,
        },
    });
});

//http://localhost:3001/users/34
router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'SUCCESSFUL - DELETE by ID',
        metadata: {
            id: req.params.id,
            method: req.method,
            hostname: req.hostname,
        },
    });
});

module.exports = router;
