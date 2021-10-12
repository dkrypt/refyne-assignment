const express = require('express');
const UserController = require('../controller/user');
const HttpError = require('../errors/HttpError');
const router = express.Router();

// Add admin user
router.post('/admin/verify', (req, res) => {
    const {userId, hash} = req.body;
    UserController.verifyAdmin(userId, hash);
    res.send('ok');    
});

// Create a new User
router.post('/', async (req, res) => {
    const {name, mobile, role } = req.body;
    try {
        const newUser = await UserController.addUser({name, mobile, role});
        res.status(201).send(JSON.stringify(newUser, null, 2));
    } catch (error) {
        res.status(error.code).send(error.json);
    }
});
// Get All Users
router.get('/', async (req, res) => {
    try {
        const allUsers = await UserController.getAllUsers();
        res.status(200).send(JSON.stringify(allUsers, null, 2));
    } catch (error) {
        res.status(error.code).send(error.json);
    }
});

// Get a user by Id
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await UserController.getUserById(id);
        res.status(200).send(JSON.stringify(user, null, 2));
    } catch (error) {
        res.status(error.code).send(error.json);
    }
});

// Update User
router.patch('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const userUpdate = req.body;
        const updatedUser = await UserController.updateUserById(id, userUpdate);
        res.status(202).send(JSON.stringify(updatedUser, null, 2));
    } catch (error) {
        res.status(error.code).send(error.json);
    }
});
// Delete User
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deletedUser = await UserController.deleteUserById(id);
        res.status(200).send(JSON.stringify(deletedUser, null, 2));
    } catch (error) {
        res.status(error.code).send(error.json);
    }
});


module.exports = router;
