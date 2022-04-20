const User = require('./user.model');
const { StatusCodes } = require('http-status-codes')
const { gets, getById, createUser } = require('./users.service')
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res, next) => {
    try {
        const users = await gets();
        res.status(StatusCodes.OK).json(users);

    } catch (error) {
        next(error);
    }
}
const getUser = async (req, res) => {
    try {
        const user = await getById(req.params.id);
        res.status(StatusCodes.OK).json(user);
    } catch (error) {
        next(error);
    }
}
const createNewUser = async (req, res, next) => {
    try {
        const foundUser = await User.findOne({ userName: req.body.userName }).exec();
        if (foundUser) return res.json('userName has already existed'); // Unauthorized!!!
        const result = await createUser(req.body.email, req.body.userName, req.body.password);
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res) => {
    try {
        if (!req?.params?.id) {
            return res.status(StatusCodes.badRequest).json({ 'message': 'ID parameter is required.' });
        }
        const user = await getById(req.params.id);
        if (!user) {
            return res.status(StatusCodes.NO_CONTENT).json({ "message": `No user matches ID ${req.params.id}.` });
        }
        if (req.body?.email) user.email = req.body.email;
        if (req.body?.userName) user.userName = req.body.userName;
        if (req.body?.password) {
            const hashedPassword = await bcrypt.hash(req.body.userName, 10);
            user.password = hashedPassword;
        }
        const result = await user.save();
        res.json(result);
    } catch (err) {
        next(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        if (!req?.params?.id) return res.status(StatusCodes.BadRequest).json({ 'message': 'User ID required.' });
        const user = await getById(req.params.id);
        if (!user) {
            return res.status(StatusCodes.NO_CONTENT).json({ "message": `No user matches ID ${req.params.id}.` });
        }
        const result = await User.deleteOne({ _id: req.params.id });
        res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser
}
