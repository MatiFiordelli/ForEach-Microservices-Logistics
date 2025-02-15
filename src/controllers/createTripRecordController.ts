import { NextFunction, Request, Response } from "express";
import { UserTrips } from "../models/index.js";
import mongoose from "mongoose";

export const createTripRecordController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const { email, trip } = req.body

	if (!email || !trip) {
		const error = new Error('Email and Trip are required')
		error.name = 'EmailAndTripAreRequired'
		throw error
	}

	// Here, it is necessary to check if the email actually exists in the user collection using node-fetch.
	// Here, we could check if the date is different to any date in the array, in case of using time also.

	try {
		let userTrips = await UserTrips.findOne({ email: email });

		if (!userTrips) {
			userTrips = new UserTrips({
				email: email,
				trips: []
			})
		}
	
		const newTrip = trip
		userTrips.trips.push(newTrip);

		const updatedDocument = await userTrips.save();
		
		if (updatedDocument) {
			res.status(200).json({ updatedDocument, message: 'OK' })
		} else {
			const error = new Error('Unable to save trip')
			error.name = 'UnableToSaveTrip'
			throw error
		}

	} catch (error) {
		const customError = error as Error & { code?: number };
  		console.error(customError);

  		if (customError.code === 11000) {
			const error = new Error('Trip already exists')
			error.name = 'TripAlreadyExists'
			next(error);
  		}
  		next(customError);
	}
};
