import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'

dotenv.config()

export const mongodbConnection = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const URI = process.env.MONGO_URI

        if (!URI) {
            const error = new Error('Mongodb URI is not defined')
            error.name = 'MongodbUriNotDefined'
            throw error
        }

        await mongoose.connect(URI)
        console.log('MongoDB connected successfully');

        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
            const database = mongoose.connection.db;

            if (!database) {
                const error = new Error('Database is undefined');
                error.name = 'DatabaseIsUndefined';
                throw error;
            }

            next();
        });

    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'MongodbUriNotDefined' || error.name === 'DatabaseIsUndefined') { 
                console.error('Error: ', error.message); 
            } else { 
                console.error('Error connecting to MongoDB: ', error.message); 
            }
            next(error)
        } else {
            next(new Error('Unknown error'))
        }        
    }
}