import express from "express";
import * as adminContoller from "../controllers/admin.controller";

const router = express.Router();

// router.get("/allcourse", adminContoller.getAllCourse);
// router.get("/:courseId", adminContoller.getCourseById);
router.get("/userdetails", adminContoller.getUserDetails);
router.post("/add-course", adminContoller.addCourse);
router.put("/update-course", adminContoller.updateCourse);
router.put("/toggleBlock/:userId", adminContoller.toggleBlock);

export default router;
