"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourse = exports.getAllCourses = void 0;
const course_model_1 = require("../models/course.model");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
//gettiing all courses
exports.getAllCourses = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Allcourse = yield course_model_1.CourseModel.find({});
    res.send(Allcourse);
}));
//put req for updating course
exports.updateCourse = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coursename, link, price } = req.body;
    yield course_model_1.CourseModel.updateOne({ _id: id }, {
        id,
        coursename,
        price,
        link,
    });
    res.send("updated succesfully");
}));
