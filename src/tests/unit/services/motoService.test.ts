import { expect } from 'chai';
import sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import MotoModel from '../../../models/Motorcycle';
import MotoService from '../../../services/Moto.service';
import { motoMock, motoMockWithId, motoMockUpdated, motoMockUpdatedWithId, allMotoMock } from '../../mocks/motoMock';

describe('Motorcycle Service', () => {
  const motoModel = new MotoModel();
  const motoService = new MotoService(motoModel);

  before(() => {
    sinon.stub(motoModel, 'create').resolves(motoMockWithId);
    sinon.stub(motoModel, 'read').resolves(allMotoMock);
    sinon.stub(motoModel, 'readOne')
      .onCall(0).resolves(motoMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(motoMockWithId)
      .onCall(3).resolves(motoMockWithId);
    sinon.stub(motoModel, 'update').resolves(motoMockUpdatedWithId);
    sinon.stub(motoModel, 'delete').resolves(motoMockWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe('Creating motorcycle', () => {
    it('Successfully creation', async () => {
      const motorcycleCreated = await motoService.create(motoMock);

      expect(motorcycleCreated).to.be.deep.equal(motoMockWithId);
    });

    it('Creation failure', async () => {
      try {
        await motoService.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
  });

  describe('Find a motorcycle', () => {
    it('Successfully found', async () => {
      const findMotorcycle = await motoService.readOne('632369b560a8c92fe81b76b1');

      expect(findMotorcycle).to.be.deep.equal(motoMockWithId);
    });
    
    it('Search failed', async () => {
      try {
        await motoService.readOne('632369b560a8c92fe81');
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.FewCharacters);
      }
    });
  });

  describe('Find all motorcycles', () => {
    it('Successfully found', async () => {
      const allMotorcycles = await motoService.read();

      expect(allMotorcycles).to.be.deep.equal(allMotoMock);
    });
  });

  describe('Update a motorcycle', () => {
    it('Successfully updated', async () => {
      const motorcycleUpdated = await motoService.update('632369b560a8c92fe81b76b1', motoMockUpdated);

      expect(motorcycleUpdated).to.be.deep.equal(motoMockUpdatedWithId);
    });

    it('Updated failed', async () => {
      try {
        await motoService.update('632369b560a8c92fe81b76b1', {} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    })
  });

  describe('Deleting a motorcycle', () => {
    it('Successfully deletion', async () => {
      const motorcycleDeleted = await motoService.delete('632369b560a8c92fe81b76b1');
      
      expect(motorcycleDeleted).to.be.deep.equal(motoMockWithId);
    });
  });
});