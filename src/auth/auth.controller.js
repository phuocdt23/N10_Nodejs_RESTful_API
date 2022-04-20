const User = require("../user/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res, next) => {
  try{
    const { userName, password } = req.body;
  if (!userName || !password) {
    return res
      .json({ message: "username and password are required" });
  }

  const foundUser = await User.findOne({ userName: userName }).exec();
  if (!foundUser) return res.json('userName do not exist'); // Unauthorized!!!
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    //create JWTs
    const accessToken = jwt.sign(
      { userName: foundUser.userName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "300s" }
    );
    const refreshToken = jwt.sign(
      { userName: foundUser.userName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    foundUser.refreshToken = refreshToken;
    // const result = await foundUser.save(); // return 
    console.log(foundUser);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,// = 1 day
    });
    res.json({ accessToken });
  } else {
    res.json({ message: "wrong password" });
  }
  }catch(err){
    next(err);
  }

  
};
module.exports = { handleLogin };
