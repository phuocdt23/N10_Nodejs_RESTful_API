const User = require('./user.model');

async function gets() {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error;

    }
}

async function getById(id) {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('Not found user ' + id);
        }
        return user;
    } catch (error) {
        throw error;
    }
}

async function createUser(email, userName, password) {
    try {
        const user = await new User({ email, userName, password }).save();
        return user;
    } catch (error) {
        throw error;
    }
}
module.exports = { gets, getById, createUser }