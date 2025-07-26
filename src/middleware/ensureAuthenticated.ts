import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";

interface TokenPayload {
    id: string
}

export const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
    }

    const [, token] = authHeader.split(" ");

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in the environment');
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const { id } = decode as TokenPayload
        const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;

    return next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}