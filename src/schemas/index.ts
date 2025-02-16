import { Schema } from 'mongoose';
import { IUserTrips } from '../interfaces/IModels.js';

export const TripSchema = new Schema<IUserTrips>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    employeeName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    trips: [
      {
        startAddress: { type: String, required: true, trim: true, lowercase: true },
        endAddress: { type: String, required: true, trim: true, lowercase: true },
        transportMode: { type: Number, required: true },
        travelDate: { type: Date, required: true },
        distance: { type: Number, required: true },
        employeeName: { type: String, required: true },
        roundTrip: { type: Boolean, required: true },
      },
    ],
  },
  {
    timestamps: true,
  },
);
