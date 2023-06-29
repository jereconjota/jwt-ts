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
exports.profile = exports.signin = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const joi_1 = require("../libs/joi");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validation
    const { error } = (0, joi_1.signupValidation)(req.body);
    if (error)
        return res.status(400).json(error.message);
    // Email Validation
    const emailExists = yield User_1.default.findOne({ email: req.body.email });
    if (emailExists)
        return res.status(400).json('Email already exists');
    // Saving a new User
    try {
        const newUser = new User_1.default({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        newUser.password = yield newUser.encryptPassword(newUser.password);
        const savedUser = yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env['TOKEN_SECRET'] || '', {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        });
        // res.header('auth-token', token).json(token);
        res.header('auth-token', token).json(savedUser);
    }
    catch (e) {
        res.status(400).json(e);
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, joi_1.signinValidation)(req.body);
    if (error)
        return res.status(400).json(error.message);
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).json('Email or Password is wrong');
    const correctPassword = yield user.validatePassword(req.body.password);
    if (!correctPassword)
        return res.status(400).json('Invalid Password');
    // Create a Token
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env['TOKEN_SECRET'] || '');
    res.header('auth-token', token).json(token);
});
exports.signin = signin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.userId, { password: 0 });
    if (!user) {
        return res.status(404).json('No User found');
    }
    res.json(user);
});
exports.profile = profile;
//# sourceMappingURL=auth.controller.js.map