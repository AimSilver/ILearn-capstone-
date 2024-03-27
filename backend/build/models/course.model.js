"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = exports.CourseSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CourseSchema = new mongoose_1.Schema({
    coursename: { type: String, required: true },
    price: { type: Number, required: true },
    link: { type: String, required: true },
});
exports.CourseModel = (0, mongoose_1.model)("course", exports.CourseSchema);
