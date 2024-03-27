import { CourseModel } from "../models/course.model";
import asyncHandler from "express-async-handler";

//gettiing all courses

export const getAllCourses = asyncHandler(async (req, res) => {
  const Allcourse = await CourseModel.find({});
  res.send(Allcourse);
});
//getting course with id
export const getCourseById = asyncHandler(async (req, res) => {
  const course = await CourseModel.findById(req.params.courseId);
  res.send(course);
});
