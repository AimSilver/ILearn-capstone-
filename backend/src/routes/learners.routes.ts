import express from "express";
import * as learnersController from "../controllers/learners.controller";
const router = express.Router();
router.put("/subscription", learnersController.addSubscription);
router.get("/getsubscriptions/:userId", learnersController.getSubscriptions);
export default router;
