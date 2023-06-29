"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const verifyToken_1 = require("../libs/verifyToken");
const authRoutes = (0, express_1.Router)();
authRoutes.post('/signin', auth_controller_1.signin);
authRoutes.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});
authRoutes.post('/signup', auth_controller_1.signup);
authRoutes.get('/profile', verifyToken_1.TokenValidation, auth_controller_1.profile);
exports.default = authRoutes;
//# sourceMappingURL=auth.routes.js.map