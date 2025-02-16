import { Request, Response } from "express";
import * as XLSX from "xlsx";
import { UserTrips } from "../models/index.js";

export const downloadTripsExcelController = async (req: Request, res: Response): Promise<void> => {
    const userTrips = await UserTrips.find().lean(); // lean() is used to get plain JavaScript objects instead of Mongoose documents

    // Process and structure data for Excel
    const data = userTrips.map(userTrip => ({
        employeeName: userTrip.employeeName,
        email: userTrip.email,
        startAddress: userTrip.trips[0].startAddress,
        endAddress: userTrip.trips[0].endAddress,
        transportMode: userTrip.trips[0].transportMode,
        travelDate: userTrip.trips[0].travelDate,
        distance: userTrip.trips[0].distance,
        //carbonFootprint: userTrip.trips[0].carbonFootprint
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trips");

    // Convert workbook to buffer
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    // Set response headers and send the Excel file
    res.setHeader('Content-Disposition', 'attachment; filename="trips.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
};
