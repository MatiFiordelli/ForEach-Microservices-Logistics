import { NextFunction, Request, Response } from 'express'
import { userTripsSchema } from '../validation/userTripsSchema.js'

export const validationUserTripData = (req: Request, res: Response, next: NextFunction): void => {
    
    try {
        const result = userTripsSchema.safeParse(req.body)
        if(!result.success){
            const error = new Error('Invalid input data')
            error.name = 'InvalidInputData'
            throw error
        }
        next()
    } catch (error) {
        next(error)
    }
}