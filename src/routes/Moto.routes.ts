import { Router } from 'express';
import MotoController from '../controllers/moto.controller';
import MotoService from '../services/Moto.service';
import MotoModel from '../models/Motorcycle';

const route = Router();

const moto = new MotoModel();
const motoService = new MotoService(moto);
const motoController = new MotoController(motoService);
const MOTORCYCLE_ID = '/motorcycles/:id';

route.post('/motorcycles', (req, res) => motoController.create(req, res));
route.get('/motorcycles', (req, res) => motoController.read(req, res));
route.get(MOTORCYCLE_ID, (req, res) => motoController.readOne(req, res));
route.put(MOTORCYCLE_ID, (req, res) => motoController.update(req, res));
route.delete(MOTORCYCLE_ID, (req, res) => motoController.delete(req, res));

export default route;