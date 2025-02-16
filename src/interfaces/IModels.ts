import { Types, Document } from "mongoose";

export interface ITrip {
  startAddress: string;
  endAddress: string;
  transportMode: number;
  travelDate: Date;
  distance: number;
  employeeName: string;
  roundTrip: boolean;
  _id: Types.ObjectId;
}

export interface IUserTrips extends Document {
  email: string;
  employeeName: string;
  trips: ITrip[];
}