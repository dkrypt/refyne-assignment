const assert = require('assert');
// const fs = require('fs');
const {User} = require('../models/user');
const HttpError = require('../errors/HttpError');

const UserController = {};
// UserController.verifyAdmin = (userId, hash) => {
//     const credentials = fs.readFileSync('./data/credentials', {encoding: 'utf8'});
//     const creds = credentials.split('\n');
//     console.log(creds[0]);
//     console.log(creds[1]);
//     if (creds[0] !== userId) {
//         throw new HttpError(400, 'userId does not match.');
//     }
//     if (creds[1] !== hash) {
//         throw new HttpError(400, 'hash does not match.');
//     }
//     const passwordDecoded = Buffer.alloc(hash.length, hash).toString('ascii');
//     const passwordDecodedFromFile = Buffer.alloc(creds[1].length, creds[1]).toString('ascii');
// };
const userExists = async ({mobile}) => {
    const userMobile = await User.findOne({mobile});
    // console.log(userMobile);
    if (userMobile) {
        return true;
    }
    return false;
};

UserController.addUser = async ({name, mobile, role}) => {
    const scope = role === 'admin' ? 'admin' : 'dev';
    const mobileExists = await userExists({mobile});
    if(mobileExists) {
        throw new HttpError(400, `Mobile Number ${mobile} is already registered.`);
    }
    const newUser = await new User({name, mobile, scope}).save().catch(err => console.log(err));
    if (!newUser) {
        throw new HttpError(500, 'Error occurred adding new user');
    }
    return newUser;
};

UserController.getAllUsers = async() => {
    let allUsers;
    try {
        allUsers = await User.find();
    } catch (error) {
        throw new HttpError(500, error.message);
    }
    if(!allUsers)
        throw new HttpError(404, 'No Users found')
    return allUsers;
};

UserController.getUserById = async (id) => {
    let user;
    try {
        user = await User.findById(id);
    } catch (error) {
        throw new HttpError(500, error.message);
    }
    if(!user) {
        throw new HttpError(404, `No user with ID ${id} found in database`);
    }
    return user;
};
UserController.updateUserById = async (id, update) => {
    let updatedUser;
    try {
        updatedUser = await User.findByIdAndUpdate(id, update, {new: true})
    } catch (error) {
        throw new HttpError(500, error.message);
    }
    if (!updatedUser)
        throw new HttpError(500, 'Not able to update user');
    return updatedUser;
}
UserController.deleteUserById = async (id) => {
    let deletedUser;
    try {
        deletedUser = await User.findByIdAndDelete(id);
    } catch (error) {
        throw new HttpError(500, error.message);
    }
    return deletedUser;
}
module.exports = UserController;
