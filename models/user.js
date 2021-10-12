const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    scope: { 
        type: String,
        required: true
    }
}, {timestamps: true, id: true});

const User = mongoose.model('User', UserSchema);
module.exports = {User, UserSchema};
