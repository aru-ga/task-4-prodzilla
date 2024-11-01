import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        res.sendStatus(401); // Unauthorized
        return; // Ensure no further execution
    }

    jwt.verify(token, process.env.JWT_SECRET || '', (err) => {
        if (err) {
            res.sendStatus(403); // Forbidden
            return; // Ensure no further execution
        }
        next(); // Proceed to the next middleware or route handler
    });
};
