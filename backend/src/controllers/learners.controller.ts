import { Course, CourseModel } from "../models/course.model";
import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import mongoose from "mongoose";

//put req for updating learner subscription
export const addSubscription = asyncHandler(async (req, res) => {
  const { id, subscriptions } = req.body;

  await UserModel.findOneAndUpdate(
    { _id: id },
    {
      $addToSet: { subscriptions: { $each: subscriptions } },
    }
  );
  res.send({ message: "updated succesfully" });
});
//get req for getting available subscriptions
export const getSubscriptions = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  console.log(`this is user id ${userId}`); //for checking purpose
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    // Handle invalid ObjectId
    res.status(400).json({ message: "Invalid user ID" });
    return;
  }
  const user = await UserModel.findById(userId);
  if (!user) {
    // Handle the case when user is null
    // For example, send a response with an error message
    res.status(404).json({ message: "User not found" });
    return;
  }

  const courses = await CourseModel.find({
    _id: { $in: user.subscriptions },
  });
  res.send(courses);
});
