import { Router } from "express";
import { signin, signup, profile } from "../controllers/auth.controller";
import { TokenValidation } from "../libs/verifyToken";

const authRoutes = Router();

authRoutes.post('/signin', signin);
authRoutes.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});
authRoutes.post('/signup', signup);
authRoutes.get('/profile', TokenValidation, profile);

export default authRoutes; 