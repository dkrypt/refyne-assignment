const express = require('express');

const userRoutes = require('../routes/user');
const carRoutes = require('../routes/car');
const bookingRoutes = require('../routes/booking');

module.exports = (app) => {
    app.use('/user', userRoutes);
    app.use('/car', carRoutes);
    app.use('/booking', bookingRoutes);
}