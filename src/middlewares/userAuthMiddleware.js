import { AUTH_COOKIE_NAME } from "../constants.js";
import jwt from "../lib/jwt.js";

export const userAuthMiddleware = async (req, res, next) => {
    const token = req.cookies[AUTH_COOKIE_NAME]; 

    if(!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        req.isAuthenticated = true;

        res.locals.username = decodedToken.username;
        res.locals.email = decodedToken.email;
        res.locals._id = decodedToken._id;
        res.locals.isAuthenticated = true;

        next();
    } catch (err) {
        res.clearCookie(AUTH_COOKIE_NAME);
        return res.redirect('/login');
    }
}

export const isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login'); 
    }

    next();
}