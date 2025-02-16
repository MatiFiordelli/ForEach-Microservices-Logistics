import { NextFunction, Request, Response } from "express";
import { UserTrips } from "../models/index.js";
import jwt, { JwtPayload } from 'jsonwebtoken'

export const getTripRecordsByEmailController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params
    const token = req.headers.authorization?.split(" ")[1] as string;
    let email = '';

    const decoded = jwt.verify(token, process.env.SECRET_FOR_TOKEN as string) as string | JwtPayload;

    if (typeof decoded === 'string' || !('email' in decoded)) {
        const error = new Error('Invalid Token Payload');
        error.name = 'InvalidTokenPayload';
        throw error;
    }
    
    email = decoded.email;

    if (!email || !id) {
        const error = new Error('Email and Trip Id are required')
        error.name = 'EmailAndTripAreRequired'
        throw error
    }

    try {
        const userTrips = await UserTrips.findOne({ email: email})
        
        if (userTrips) {
            res.status(200).json({ message: 'OK', user: userTrips})
           
        } else {
            const error = new Error('User not found')
            error.name = 'UserNotFound'
            throw error
        }
        
    } catch (error) {
        console.error(error)
        next(error)
    }
};