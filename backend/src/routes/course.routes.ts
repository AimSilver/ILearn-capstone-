import express from "express";
import * as courseController from "../controllers/course.controller";
const router = express.Router();

router.get("/home", courseController.getAllCourses);
router.get("/course-page/:courseId", courseController.getCourseById);

export default router;
