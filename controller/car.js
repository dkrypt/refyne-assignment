const assert = require('assert');
const {Car} = require('../models/car');
const HttpError = require('../errors/HttpError');

const CarController = {};

const carExist = async ({carLicenseNumber}) => {
    console.log('here');
    const car = await Car.findOne({carLicenseNumber});
    if (car) {
        return true;
    }
    return false;
};

CarController.addCar = async ({carLicenseNumber, manufacturer, model, base_price, price_per_hour, security_deposit, booked}) => {
    const carExists = await carExist({carLicenseNumber});
    if(carExists) {
        console.log('Car exists');
        throw new HttpError(400, `Car with License Number ${carLicenseNumber} is already registered.`);
    }
    const newCar = await new Car({carLicenseNumber, manufacturer, model, base_price, price_per_hour, security_deposit, booked}).save().catch(err => console.log(err));
    if (!newCar) {
        throw new HttpError(500, 'Error occurred adding new car');
    }
    return newCar;
};

CarController.getAllCars = async() => {
    let allCars;
    try {
        allCars = await Car.find();
    } catch (error) {
        throw new HttpError(500, error.message);
    }
    if(!allCars)
        throw new HttpError(404, 'No Cars found')
    return allCars;
};

CarController.getCarById = async (id) => {
    let car;
    try {
        car = await Car.findById(id);
    } catch (error) {
        throw new HttpError(500, error.message);
    }
    if(!car) {
        throw new HttpError(404, `No car with ID ${id} found in database`);
    }
    return car;
};
CarController.updateCarById = async (id, update) => {
    let updatedCar;
    try {
        updatedCar = await Car.findByIdAndUpdate(id, update, {new: true})
    } catch (error) {
        throw new HttpError(500, error.message);
    }
    if (!updatedCar)
        throw new HttpError(500, 'Not able to update car');
    return updatedCar;
}
CarController.deleteCarById = async (id) => {
    let deletedCar;
    try {
        deletedCar = await Car.findByIdAndDelete(id);
    } catch (error) {
        throw new HttpError(500, error.message);
    }
    return deletedCar;
}
module.exports = CarController;
