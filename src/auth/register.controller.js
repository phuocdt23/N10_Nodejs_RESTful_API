const User = require("../user/user.model");
const bcrypt = require("bcrypt");
const { StatusCodes } = require('http-status-codes')


//register users
const handleNewUser = async (req, res) => {
  
  const {userName, password } = req.body;
  if (!password || !userName)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "userName and password are required!!!!!" });

  //check for duplicate users
  const duplicate = await User.findOne({ userName: userName }).exec();
  if (duplicate) return res.status(StatusCodes.CONFLICT).json({ message: "this user already exists" })// Conflict!, this user already existed!
    //encrypt the password
    try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await new User({ userName: userName, password: hashedPassword }).save();
    console.log(result);
    res.status(StatusCodes.CREATED).json({ success: `New user ${userName} created!` });
  } catch (err) {
    return res.json({ message: err.message });
  }
};
module.exports = { handleNewUser };
