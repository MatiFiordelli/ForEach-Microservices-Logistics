import { z } from 'zod';

const tripSchema = z.object({
  startAddress: z
    .string()
    .trim()
    .min(5, 'Start address must be at least 5 characters')
    .max(100, 'Start address must be at most 100 characters')
    .nonempty('Start address is required'),
  endAddress: z
    .string()
    .trim()
    .min(5, 'End address must be at least 5 characters')
    .max(100, 'End address must be at most 100 characters')
    .nonempty('End address is required'),
  transportMode: z.number().int().positive('Transport mode is required'),
  travelDate: z.date(),
  distance: z.number().positive('Distance must be a positive number'),
  employeeName: z
    .string()
    .trim()
    .min(2, 'Employee name must be at least 2 characters')
    .max(50, 'Employee name must be at most 50 characters')
    .nonempty('Employee name is required'),
  roundTrip: z.boolean(),
});

export const userTripsSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email' })
    .refine((email) => email.trim(), { message: 'Email cannot be empty' }),

  trips: z.array(tripSchema).optional(),
});
