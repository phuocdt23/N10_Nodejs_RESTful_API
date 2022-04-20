const User = require("../user/user.model");
const { StatusCodes } = require('http-status-codes')

const jwt = require("jsonwebtoken");
const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(StatusCodes.UNAUTHORIZED).json("Unauthorized!"); //401: Unauthorized
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    const foundUser = User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(StatusCodes.FORBIDDEN).json("forbidden");

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || foundUser.userName !== decoded.userName) {
        const accessToken = jwt.sign(
          { userName: decoded.userName },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
        return res.json({ accessToken });
      }
    });
  } catch (err) { throw err; };
};
module.exports = { handleRefreshToken };
