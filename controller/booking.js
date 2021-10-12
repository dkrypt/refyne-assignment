const HttpError = require('../errors/HttpError');
const User = require('../models/user');
const Car = require('../models/car');
const Booking = require('../models/booking');
const CarController = require('../controller/car');
const UserController = require('../controller/user');

const BookingController = {};

BookingController.getAllBookings = async () => {
    const allBookings = await Booking.find();
    return allBookings;
};
BookingController.searchCars = async (from, to) => {
    
};

module.exports = BookingController;
