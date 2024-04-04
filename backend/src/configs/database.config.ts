import { connect, ConnectOptions } from "mongoose";
require("dotenv").config();
export const dbConnect = () => {
  console.log(process.env.MONGODB_URL!);
  connect(process.env.MONGODB_URL!).then(
    () => {
      console.log("Database connected successfully");
    },
    (error) => {
      console.error("Database connection failed");
      console.error(error);
    }
  );
};
