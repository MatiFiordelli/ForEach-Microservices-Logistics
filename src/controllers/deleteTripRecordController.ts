import { NextFunction, Request, Response } from "express";
import { UserTrips } from "../models/index.js";
import mongoose from "mongoose";

export const deleteTripRecordController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email } = req.body
    const { id } = req.params

    if (!email || !id)	{
		const error = new Error('Email and Trip Id are required')
		error.name = 'EmailAndTaskAreRequired'
		throw error
	}

    if (!mongoose.Types.ObjectId.isValid(id)) { 
        res.status(400).json({ message: 'Invalid Trip ID' }); 
        return; 
    }

    try{
        const result = await UserTrips.updateOne(
            { email: email}, 
            { $pull: { trips: { _id: id } } }
        )

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'OK' })
        } else {
            const error = new Error('Document not found')
            error.name = 'DocumentNotFound'
            throw error
        }

    } catch (error) {
        console.error(error)
        next(error)
    } 
};
