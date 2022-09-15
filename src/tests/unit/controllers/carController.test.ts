import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import { carMock, carMockWithId, carMockUpdated, carMockUpdatedWithId, allCarMock } from '../../mocks/carMock';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car.service';
import CarController from '../../../controllers/Car.controller';

describe('Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(carMockWithId);
    sinon.stub(carService, 'readOne').resolves(carMockWithId);
    sinon.stub(carService, 'read').resolves(allCarMock);
    sinon.stub(carService, 'update').resolves(carMockUpdatedWithId);
    sinon.stub(carService, 'delete').resolves(carMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  });

  describe('Creating car', () => {
    it('Successfully creation', async () => {
      req.body = carMock;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('Find a car', () => {
    it('Successfully found', async () => {
      req.params = { id: '632369b560a8c92fe81b76b1' };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('Find all cars', () => {
    it('Successfully found', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(allCarMock)).to.be.true;
    });
  });

  describe('Update a car', () => {
    it('Successfully updated', async () => {
      req.params = { id: '632369b560a8c92fe81b76b1' };
      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockUpdatedWithId)).to.be.true;
    });
  });

  describe('Deleting a car', () => {
    it('Successfully deletion', async () => {
      req.params = { id: '632369b560a8c92fe81b76b1' };
      await carController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    });
  });
});