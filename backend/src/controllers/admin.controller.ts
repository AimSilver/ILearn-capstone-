import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { User, UserModel } from "../models/user.model";
import { Course, CourseModel } from "../models/course.model";

//post request for creating new course
export const addCourse = asyncHandler(async (req, res) => {
  const { coursename, price } = req.body;
  const newCourse: Course = {
    id: "",
    coursename: coursename,
    price: price,
  };
  const dbCourse = await CourseModel.create(newCourse);
  res.send("new course created succesfully");
});

//put req for updating
export const updateCourse = asyncHandler(async (req, res) => {
  const { id, coursename, price } = req.body;
  await CourseModel.updateOne(
    { _id: id },
    {
      id,
      coursename,
      price,
    }
  );
  res.send("updated succesfully");
});
//get req for viewing detail of faculty and learners
export const getUserDetails = asyncHandler(async (req, res) => {
  const allUsers = await UserModel.find({});
  console.log(allUsers);
  res.send(allUsers);
});

//put req for blocking /unblocking users
export const toggleBlock = asyncHandler(async (req: any, res) => {
  const { userId } = req.params;

  // Find user by ID and toggle block status
  const user = await UserModel.findById(userId);
  user!.isBlocked = !user!.isBlocked;
  user!.save();

  // Send updated block status as the response
  res.send(user!.isBlocked);
});
