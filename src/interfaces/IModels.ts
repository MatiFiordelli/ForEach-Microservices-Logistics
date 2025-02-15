import { Types, Document } from "mongoose";

export interface ITrip {
  startAddress: string;
  endAddress: string;
  transportMode: number;
  travelDate: Date;
  distance: number;
  employeeName: string;
  roundTrip: boolean;
}

export interface IUserTrips extends Document {
  email: string;
  trips: ITrip[];
}