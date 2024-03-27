import { Schema, model } from "mongoose";

export interface Course {
  id: string;
  coursename: string;
  price: number;
}
export const CourseSchema = new Schema<Course>(
  {
    coursename: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const CourseModel = model<Course>("course", CourseSchema);
