import asyncHandler from "express-async-handler";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import dotenv from "dotenv";
import { CourseModel } from "../models/course.model";
dotenv.config();
//user login
export const signin = asyncHandler(async (req, res) => {
  const user = await UserModel.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });
  if (!user) {
    res.status(HTTP_BAD_REQUEST).send("User not found!");
    return;
  }
  if (user.isBlocked) {
    res
      .status(HTTP_BAD_REQUEST)
      .send("User is blocked. Please contact support.");
    return;
  }

  if (await bcrypt.compare(req.body.password, user.password)) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(HTTP_BAD_REQUEST).send("User name or password is not valid! ");
  }
});
// user registration
export const signup = asyncHandler(async (req, res) => {
  const { username, email, password, role, address } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.status(HTTP_BAD_REQUEST).send("User already exists!, please login!");
  } else {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: "",
      username: username,
      email: email,
      password: encryptedPassword,
      address: address,
      role: role,
      isAdmin: false,
      isBlocked: false,
      subscriptions: [],
    };
    const dbUser = await UserModel.create(newUser);

    res.send(generateTokenResponse(dbUser));
  }
});

//function for jwt token
const generateTokenResponse = (user: User) => {
  console.log(`this is from auth` + process.env.JWT_SECRET);
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "fall-back-secret-key",
    { expiresIn: "1h" }
  );
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token,
    role: user.role,
    susbscriptions: user.subscriptions,
  };
};
