import mongoose from "mongoose";
import { TripSchema, TransportModeSchema } from "../schemas/index.js";
import { IUserTrips } from "../interfaces/IModels.js";

export const UserTrips = mongoose.model<IUserTrips>('UserTrips', TripSchema)
export const TransportModes = mongoose.model<IUserTrips>('TransportModes', TransportModeSchema)