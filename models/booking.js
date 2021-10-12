const mongoose = require('mongoose');
const {UserSchema} = require('./user');
const {CarSchema} = require('./car');

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    bookedBy: {
        type: UserSchema,
        required: true
    },
    bookedVehicle: {
        type: CarSchema,
        required: true
    },
    fromDateTime: {
        type: Date,
        required: true
    },
    toDateTime: {
        type: Date,
        required: true
    }
}, {timestamps: true, id: true});
 
const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
