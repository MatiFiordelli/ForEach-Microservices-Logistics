import { NextFunction, Request, Response } from "express";
import { UserTrips } from "../models/index.js";
import mongoose from "mongoose";

export const updateTripRecordController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, trip } = req.body;
    const { id } = req.params;
    const objectId = new mongoose.Types.ObjectId(id);

    if (!email || !trip) {
        const error = new Error('Email and Trip are required');
        error.name = 'EmailAndTripAreRequired';
        throw error;
    }

    try {
        let userTrips = await UserTrips.findOne({ email: email });

        if (!userTrips) {
            const error = new Error('Document not found');
            error.name = 'DocumentNotFound';
            throw error;
        }

        const tripIndex = userTrips.trips.findIndex((t) => t._id.toString() === id);

        if (tripIndex === -1) {
            const error = new Error('Trip not found');
            error.name = 'TripNotFound';
            throw error;
        }

        userTrips.trips[tripIndex] = trip

        const updatedDocument = await userTrips.save();

        if (updatedDocument) {
            res.status(200).json({ updatedDocument, message: 'OK' });
        } else {
            const error = new Error('Unable to save trip');
            error.name = 'UnableToSaveTrip';
            throw error;
        }
        
    } catch (error) {
        const customError = error as Error & { code?: number };
        console.error(customError);

        if (customError.code === 11000) {
            const error = new Error('Trip already exists');
            error.name = 'TripAlreadyExists';
            next(error);
        } else {
            next(customError);
        }
    }
};