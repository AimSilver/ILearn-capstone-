"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const faculty_routes_1 = __importDefault(require("./routes/faculty.routes"));
const learners_routes_1 = __importDefault(require("./routes/learners.routes"));
// import cookieSession from "cookie-session";
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:4200"],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(
//   cookieSession({
//     name: "session", // Name of the cookie (optional, defaults to 'session')
//     keys: ["your-secret-key"], // Array of secret keys for signing cookies
//     maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (24 hours in milliseconds)
//   })
// );
app.use("/api/auth", auth_routes_1.default);
app.use("/api", course_routes_1.default);
app.use("/api/admin", admin_routes_1.default);
app.use("/api/faculty", faculty_routes_1.default);
app.use("/api/learners", learners_routes_1.default);
const port = process.env.Port || 5000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:` + port);
});
