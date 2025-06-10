import User from "./../model/User.mode.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendToken } from "./../utlis/sendToken.js";

export const userRegister = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (
      !name ||
      !email ||
      !password ||
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
   
    sendToken(user, res);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || email.trim() === "" || password.trim() === "") {
      return res.status(400).json({
        message: "Please enter both email and password.",
      });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
      return res.status(401).json({
        message: "Hmm... that email is not registered.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Oops! The password you entered is incorrect.",
      });
    }

   sendToken(user, res, `Welcome back, ${user.name}!`);

    res.status(200).json({
      message: `Welcome back, ${user.name}! 🎉`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};
