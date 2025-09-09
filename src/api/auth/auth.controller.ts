import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2"

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if(existingUser) {
            return res.status(409).json({message: 'Email is already in use'})
        }
        const hashedPassword = await argon2.hash(password);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })
        const payload = { id: user.id, username: user.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: '7d',
        });
        res.status(200).json({
            token,
        })
    } catch (error) {
        res.status(500).json({
            message: 'An error occured during registration'
        })
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if(!user) {
            return res.status(401).json({
                message: 'Invalid credential'
            })
        }

        // verify the password
        const isPasswordValid = await argon2.verify(user.password, password);
        if(!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid credential'
            });
        }

        const payload = {id: user.id, username: user.username}
        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: '3d'
        });
        
        res.status(200).json({
            token
        })
    } catch (error) {
        console.log('[login] error', error)
        res.status(500).json({
            message: 'An error occured during login'
        })
    }
}