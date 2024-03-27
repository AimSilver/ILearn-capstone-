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
exports.signout = exports.signup = exports.signin = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../models/user.model");
const http_status_1 = require("../constants/http_status");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//user login
exports.signin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (user && (yield bcryptjs_1.default.compare(req.body.password, user.password))) {
        res.send(generateTokenResponse(user));
    }
    else {
        res.status(http_status_1.HTTP_BAD_REQUEST).send("User name or password is not valid!");
    }
}));
// user registration
exports.signup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role, address } = req.body;
    const user = yield user_model_1.UserModel.findOne({ email });
    if (user) {
        res.status(http_status_1.HTTP_BAD_REQUEST).send("User already exists!, please login!");
    }
    else {
        const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = {
            id: "",
            username: username,
            email: email,
            password: encryptedPassword,
            address: address,
            role: role,
            isAdmin: false,
            isBlocked: false,
        };
        const dbUser = yield user_model_1.UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser));
    }
}));
// user logout
exports.signout = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.session = null;
        res.redirect("/login");
    }
    catch (err) {
        // Pass the error to the next middleware (error handler)
        next(err);
    }
}));
//function for jwt token
const generateTokenResponse = (user) => {
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET || "fall-back-secret-key", { expiresIn: "1h" });
    return {
        id: user.id,
        email: user.email,
        username: user.username,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token,
    };
};
