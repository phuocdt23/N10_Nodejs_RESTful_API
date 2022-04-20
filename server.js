require("dotenv").config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/dbConnection');
const {verifyJWT} = require('./src/user/verifyJWT.middleware');  
const mongoose= require('mongoose');
const PORT = process.env.PORT || 3000;
connectDB();

// built-in middleware for json
app.use(express.json());
// middleware for cookies
app.use(cookieParser());

app.use('/register', require('./src/auth/register.route'));
app.use('/auth', require('./src/auth/auth.route'));
app.use('/refresh', require('./src/auth/refreshToken.route'));
// app.use('/refresh', require('./src/auth/refreshToken.route'));

// protected route
app.use('/users',verifyJWT, require('./src/user/users.route'))
// handling error
app.use( require('./src/helper/ErrorHandler').errorHandler);
mongoose.connection.once('open',() => {
    console.log('Success connecting to: mongodb://127.0.0.1:27017');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
})
module.exports = app;