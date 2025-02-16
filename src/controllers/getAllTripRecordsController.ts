import { NextFunction, Request, Response } from "express";
import { UserTrips } from "../models/index.js";

export const getAllTripRecordsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //In this controller, it is possible and necessary to add pagination

    try {
        const userTrips = await UserTrips.find({})
        
        if (userTrips.length > 0) {
            res.status(200).json({ message: 'OK', users: userTrips });
        } else {
            res.status(404).json({ message: 'No trips found' });
        }
        
    } catch (error) {
        console.error(error)
        next(error)
    }
};