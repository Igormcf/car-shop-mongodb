import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import carRouter from './routes/Car.routes';
import motoRouter from './routes/Moto.routes';

const app = express();
app.use(express.json());
app.use(carRouter);
app.use(motoRouter);
app.use(errorHandler);

export default app;
