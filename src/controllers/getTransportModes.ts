import { NextFunction, Request, Response } from "express";
import { TransportModes } from "../models/index.js";

export const getTransportModes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const transportModes = await TransportModes.find({})
        
        if (transportModes.length > 0) {
            res.status(200).json({ message: 'OK', transportModes: transportModes });
        } else {
            res.status(404).json({ message: 'No transport modes found' });
        }
        
    } catch (error) {
        console.error(error)
        next(error)
    }
};