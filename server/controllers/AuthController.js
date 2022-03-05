import User from "../models/UsersModel.js";
import {
  registerValidation,
  loginValidation,
} from "../middlewares/UserValidation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UsersController {
  static saveUser = async (req, res) => {
    console.log(req.body.password);
    //Let's validate the inputs.
    const {error} = registerValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    //check if a user is in the database
    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists)  {
       return res.json("Email already Exists");
    }

    //Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword)
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    console.log(user)

    user.save().then(() => {
      res.json("saved").status(200)
    });
  };

  static getUsers = async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (error) {
      res.status(404).send(error);
    }
  };

  static userLogin = async (req, res) => {
    //Let's validate the inputs.
    const { error } = loginValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    //check if a email is in the database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid Email Plz Try Again!");

    //check if the password is correct.
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res.status(400).send("Invalid Password Plz Try Again!");

    // do the database authentication here, with user name and password combination.
    // const token = jwt.sign({_id: user.id}, config.secret, { expiresIn: config.tokenLife})
    // const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
    // const response = {
    //     "status": "Logged in",
    //     "token": token,
    //     "refreshToken": refreshToken,
    // }
    // tokenList[refreshToken] = response
    // res.status(200).json(response);

    //create and Assign a token
    const token = jwt.sign(
      { user: { id: user.id, role: user.role, username: user.username } },
      `${process.env.SECRET_KEY}`,
      { expiresIn: 3600 }
    );
    // res.header("auth-token", token);

    res
      .status(200)
      .json({ success: "Logged In Successfully :", accessToken: token });
  };
}


export default UsersController;
