import express from 'express';
import { createTripRecordController } from '../controllers/createTripRecordController.js';
import { deleteTripRecordController } from '../controllers/deleteTripRecordController.js';
import { getAllTripRecordsController } from '../controllers/getAllTripRecordsController.js';
import { getTripRecordsByEmailController } from '../controllers/getTripRecordsByEmailController.js';
import { searchTripRecordsController } from '../controllers/searchTripRecordsController.js';
import { updateTripRecordController } from '../controllers/updateTripRecordController.js';
import { downloadTripsExcelController } from '../controllers/downloadTripsExcelController.js';
import { validationUserTripData } from '../middlewares/validationUserTripData.js';
import { validationToken } from '../middlewares/validationToken.js';

const router = express.Router();

/**
 * @swagger
 * /trip-records:
 *   post:
 *     summary: Create a new trip record
 *     description: Creates a new trip record for the specified email. If the email does not exist, it creates a new user trip record.
 *     tags: 
 *       - Trip Records
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - trip
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *               employeeName:
 *                 type: string
 *                 description: Name of the user/employee.
 *               trip:
 *                 type: object
 *                 description: Trip details.
 *                 properties:
 *                   startAddress:
 *                     type: string
 *                     description: Starting address of the trip.
 *                   endAddress:
 *                     type: string
 *                     description: Ending address of the trip.
 *                   transportMode:
 *                     type: number
 *                     description: Mode of transport.
 *                   travelDate:
 *                     type: string
 *                     format: date-time
 *                     description: Date of travel.
 *                   distance:
 *                     type: number
 *                     description: Distance of the trip.
 *                   employeeName:
 *                     type: string
 *                     description: Name of the employee.
 *                   roundTrip:
 *                     type: boolean
 *                     description: Whether the trip is a round trip.
 *     responses:
 *       200:
 *         description: Trip record created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updatedDocument:
 *                   type: object
 *                   description: The updated document.
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request. Missing email or trip in the request body.
 *       409:
 *         description: Conflict. Trip already exists.
 *       500:
 *         description: Internal server error.
 */
router.post('/trip-records', validationToken, validationUserTripData, createTripRecordController);

/**
 * @swagger
 * /trip-records:
 *   get:
 *     summary: Get all trip records with pagination
 *     description: Retrieves all trip records from the database, in the future it will be updated with pagination support.
 *     tags:
 *       - Trip Records
 *     
 *     responses:
 *       200:
 *         description: A list of trip records.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OK
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                   description: List of trip records.
  *       404:
 *         description: No trips found.
 *       500:
 *         description: Internal server error.
 */
router.get('/trip-records', validationToken, getAllTripRecordsController);

/**
 * @swagger
 * /trip-records/search:
 *   get:
 *     summary: Search for trip records with filters
 *     description: Search for trip records by employee name, start address, and end address.
 *     tags: 
 *       - Trip Records
 *     parameters:
 *       - name: employeeName
 *         in: query
 *         required: false
 *         description: Name of the employee.
 *         schema:
 *           type: string
 *       - name: startAddress
 *         in: query
 *         required: false
 *         description: Start address of the trip.
 *         schema:
 *           type: string
 *       - name: endAddress
 *         in: query
 *         required: false
 *         description: End address of the trip.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OK
 *                 trips:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 67b132f751585342591586f0
 *                       email:
 *                         type: string
 *                         example: user@example.com
 *                       employeeName:
 *                         type: string
 *                         example: John Doe
 *                       trips:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             startAddress:
 *                               type: string
 *                               example: 123 Main St
 *                             endAddress:
 *                               type: string
 *                               example: 456 Elm St
 *                             transportMode:
 *                               type: integer
 *                               example: 1
 *                             travelDate:
 *                               type: string
 *                               format: date-time
 *                               example: 2025-02-16T08:00:00Z
 *                             distance:
 *                               type: number
 *                               example: 10
 *                             employeeName:
 *                               type: string
 *                               example: John Doe
 *                             roundTrip:
 *                               type: boolean
 *                               example: false
 *       404:
 *         description: No trips found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No trips found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/trip-records/search', validationToken, searchTripRecordsController);

/**
 * @swagger
 * /trip-records/{id}:
 *   get:
 *     summary: Get trip records by email
 *     description: Retrieves trip records for the user identified by the email in the authorization token.
 *     tags: 
 *       - Trip Records
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for authentication.
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the trip record to retrieve.
 *     responses:
 *       200:
 *         description: Trip records retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OK
 *                 user:
 *                   type: object
 *                   description: User trip records.
 *       400:
 *         description: Bad request. Missing email or trip ID.
 *       401:
 *         description: Unauthorized. Invalid or missing token.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/trip-records/:id', validationToken, getTripRecordsByEmailController);

/**
 * @swagger
 * /trip-records/{id}:
 *   put:
 *     summary: Update an existing trip record
 *     description: Updates a trip record for the specified email and trip ID.
 *     tags: 
 *       - Trip Records
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the trip record to update.
 *       - in: body
 *         name: body
 *         required: true
 *         description: The trip details to update.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - trip
 *           properties:
 *             email:
 *               type: string
 *               description: Email of the user.
 *             trip:
 *               type: object
 *               description: Trip details to update.
 *               properties:
 *                 startAddress:
 *                   type: string
 *                   description: Starting address of the trip.
 *                 endAddress:
 *                   type: string
 *                   description: Ending address of the trip.
 *                 transportMode:
 *                   type: number
 *                   description: Mode of transport.
 *                 travelDate:
 *                   type: string
 *                   format: date-time
 *                   description: Date of travel.
 *                 distance:
 *                   type: number
 *                   description: Distance of the trip.
 *                 employeeName:
 *                   type: string
 *                   description: Name of the employee.
 *                 roundTrip:
 *                   type: boolean
 *                   description: Whether the trip is a round trip.
 *     responses:
 *       200:
 *         description: Trip record updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updatedDocument:
 *                   type: object
 *                   description: The updated document.
 *                 message:
 *                   type: string
 *                   example: OK
 *       400:
 *         description: Bad request. Missing email or trip in the request body.
 *       404:
 *         description: Trip or user not found.
 *       409:
 *         description: Conflict. Trip already exists.
 *       500:
 *         description: Internal server error.
 */
router.put('/trip-records/:id', validationToken, validationUserTripData, updateTripRecordController);

/**
 * @swagger
 * /trip-records/{id}:
 *   delete:
 *     summary: Delete a trip record
 *     description: Deletes a trip record for the specified email and trip ID.
 *     tags: 
 *       - Trip Records
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the trip record to delete.
 *       - in: body
 *         name: body
 *         required: true
 *         description: The email and trip ID to delete.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *           properties:
 *             email:
 *               type: string
 *               description: Email of the user.
 *     responses:
 *       200:
 *         description: Trip record deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OK
 *       400:
 *         description: Bad request. Missing email or trip ID, or invalid trip ID.
 *       404:
 *         description: Trip or user not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/trip-records/:id', validationToken, deleteTripRecordController);

router.get('/downloadTripsExcel', downloadTripsExcelController);

export { router };
