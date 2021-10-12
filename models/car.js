const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CarSchema = new Schema({
    carLicenseNumber: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    base_price: {
        type: Number,
        required: true
    },
    price_per_hour: {
        type: Number,
        required: true
    },
    security_deposit: {
        type: Number,
        required: true
    },
    booked: {
        type: Boolean,
        required: true,
        default: false
    }
}, {timestamps: true, id: true});

const Car = mongoose.model('car', CarSchema);
module.exports = {Car, CarSchema};
