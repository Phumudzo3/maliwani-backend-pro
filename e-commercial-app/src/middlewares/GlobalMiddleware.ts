import { validationResult } from "express-validator";
import { Jwt } from "../utils/Jwt";

export class GlobalMiddleWare {
    static checkError(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                message: errors.array()[0].msg 
            });
        }
        next();
    }

    static async auth(req, res, next) {
        const header_auth = req.headers.authorization; // Bearer token
        const token = header_auth ? header_auth.slice(7, header_auth.length) : null;

        try {
            if (!token) {
                return res.status(401).json({ 
                    success: false, 
                    message: "Unauthorized: Missing token" 
                });
            }
            const decoded = await Jwt.jwtVerify(token);
            req.user = decoded;
            next();
        } catch (e) {
            res.status(401).json({ 
                success: false, 
                message: "Unauthorized: Invalid token" 
            });
        }
    }

    static async decodeRefreshToken(req, res, next) {
        const refreshToken = req.body.refreshToken;
        try {
            if (!refreshToken) {
                return res.status(403).json({ 
                    success: false, 
                    message: "Forbidden: Missing refresh token" 
                });
            }
            const decoded = await Jwt.jwtVerifyRefreshToken(refreshToken);
            req.user = decoded;
            next();
        } catch (e) {
            res.status(403).json({ 
                success: false, 
                message: "Forbidden: Invalid refresh token or session expired" 
            });
        }
    }

    static adminRole(req, res, next) {
        const user = req.user;
        if (user.type !== "admin") {
            return res.status(403).json({ 
                success: false, 
                message: "Forbidden: Unauthorized user" 
            });
        }
        next();
    }

    static adminStoreRole(req, res, next) {
        const user = req.user;
        if (user.type === "admin" || user.type === "store") {
            next();
        } else {
            return res.status(403).json({ 
                success: false, 
                message: "Forbidden: Unauthorized user" 
            });
        }
    }
}