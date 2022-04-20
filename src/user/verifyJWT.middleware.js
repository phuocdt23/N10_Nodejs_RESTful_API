const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(StatusCodes.UNAUTHORIZED);
    // console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(StatusCodes.BAD_REQUEST); //invalid token
            req.userName = decoded.userName;
        }
    );
    next();
}

module.exports = {verifyJWT};