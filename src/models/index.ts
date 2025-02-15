import mongoose from "mongoose";
import { TripSchema } from "../schemas/index.js";
import { IUserTrips } from "../interfaces/IModels.js";

export const UserTrips = mongoose.model<IUserTrips>('UserTrips', TripSchema)