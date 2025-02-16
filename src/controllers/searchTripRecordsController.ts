import { NextFunction, Request, Response } from "express";
import { UserTrips } from "../models/index.js";

export const searchTripRecordsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { employeeName, startAddress, endAddress } = req.query;

    //In this controller, it is possible and necessary to add pagination

    const searchFilter: any = {};

    if (typeof employeeName === 'string') {
        searchFilter['employeeName'] = new RegExp(employeeName as string, 'i');
    }

    const tripsFilter: any = {};

    if (typeof startAddress === 'string') {
        tripsFilter.startAddress = new RegExp(startAddress as string, 'i');
    }
    if (typeof endAddress === 'string') {
        tripsFilter.endAddress = new RegExp(endAddress as string, 'i');
    }

    if (Object.keys(tripsFilter).length > 0) {
        searchFilter.trips = { $elemMatch: tripsFilter };
    }

    try {
        const userTrips = await UserTrips.find(searchFilter);

        // Filters trips within each user document to include only those matching startAddress and/or endAddress
        const filteredUserTrips = userTrips.map(userTrip => {
            if (startAddress) {
                userTrip.trips = userTrip.trips.filter(trip => trip.startAddress.includes(startAddress as string));
            }
            if (endAddress) {
                userTrip.trips = userTrip.trips.filter(trip => trip.endAddress.includes(endAddress as string));
            }
            return userTrip;
        }).filter(userTrip => userTrip.trips.length > 0);
      

        if (filteredUserTrips.length > 0) {
            res.status(200).json({ message: 'OK', trips: filteredUserTrips });
        } else {
            res.status(404).json({ message: 'No trips found' });
        }
        
    } catch (error) {
        console.error(error);
        next(error);
    }
};