import { z } from 'zod';
import { VehicleSchema } from './IVehicle';

const MotorcycleSchema = VehicleSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().lte(2500).gt(0),
});

export type IMotorcycle = z.infer<typeof MotorcycleSchema>;
export { MotorcycleSchema };