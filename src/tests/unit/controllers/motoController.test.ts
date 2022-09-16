import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import { motoMock, motoMockWithId, motoMockUpdatedWithId, allMotoMock } from '../../mocks/motoMock';
import MotoModel from '../../../models/Motorcycle';
import MotoService from '../../../services/Moto.service';
import MotoController from '../../../controllers/moto.controller';

describe('Car Controller', () => {
  const motoModel = new MotoModel();
  const motoService = new MotoService(motoModel);
  const motoController = new MotoController(motoService);
  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(motoService, 'create').resolves(motoMockWithId);
    sinon.stub(motoService, 'readOne').resolves(motoMockWithId);
    sinon.stub(motoService, 'read').resolves(allMotoMock);
    sinon.stub(motoService, 'update').resolves(motoMockUpdatedWithId);
    sinon.stub(motoService, 'delete').resolves(motoMockWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  });

  describe('Creating motorcycle', () => {
    it('Successfully creation', async () => {
      req.body = motoMock;
      await motoController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motoMockWithId)).to.be.true;
    });
  });

  describe('Find a motorcycle', () => {
    it('Successfully found', async () => {
      req.params = { id: '632369b560a8c92fe81b76b1' };
      await motoController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motoMockWithId)).to.be.true;
    });
  });

  describe('Find all motorcycles', () => {
    it('Successfully found', async () => {
      await motoController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(allMotoMock)).to.be.true;
    });
  });

  describe('Update a motorcycle', () => {
    it('Successfully updated', async () => {
      req.params = { id: '632369b560a8c92fe81b76b1' };
      await motoController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motoMockUpdatedWithId)).to.be.true;
    });
  });

  describe('Deleting a motorcycle', () => {
    it('Successfully deletion', async () => {
      req.params = { id: '632369b560a8c92fe81b76b1' };
      await motoController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    });
  });
});