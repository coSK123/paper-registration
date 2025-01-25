import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    console.log(authHeader);
    jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) return res.sendStatus(403); 
        req.email = decoded.email;
        next();
    });
}

