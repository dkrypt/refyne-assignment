const express = require('express');
const CarController = require('../controller/car');
// const HttpError = require('../errors/HttpError');
const router = express.Router();


// Create a new User
router.post('/', async (req, res) => {
    const {carLicenseNumber, manufacturer, model, base_price, price_per_hour, security_deposit, booked } = req.body;
    try {
        const newCar = await CarController.addCar({carLicenseNumber, manufacturer, model, base_price, price_per_hour, security_deposit, booked});
        res.status(201).send(JSON.stringify(newCar, null, 2));
    } catch (error) {
        console.log(error);
        res.status(error.code).send(error.json);
    }
});
// Get All Users
router.get('/', async (req, res) => {
    try {
        const allCars = await CarController.getAllCars();
        res.status(200).send(JSON.stringify(allCars, null, 2));
    } catch (error) {
        res.status(error.code).send(error.json);
    }
});

// Get a user by Id
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const car = await CarController.getCarById(id);
        res.status(200).send(JSON.stringify(car, null, 2));
    } catch (error) {
        res.status(error.code).send(error.json);
    }
});

// Update User
router.patch('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const carUpdate = req.body;
        const updatedCar = await CarController.updateCarById(id, carUpdate);
        res.status(202).send(JSON.stringify(updatedCar, null, 2));
    } catch (error) {
        res.status(error.code).send(error.json);
    }
});
// Delete User
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deletedCar = await CarController.deleteCarById(id);
        res.status(200).send(JSON.stringify(deletedCar, null, 2));
    } catch (error) {
        res.status(error.code).send(error.json);
    }
});
module.exports = router;
