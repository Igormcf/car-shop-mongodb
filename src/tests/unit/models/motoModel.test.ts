import { expect } from 'chai';
import sinon from 'sinon';
import MotoModel from '../../../models/Motorcycle';
import { Model } from 'mongoose';
import { motoMock, motoMockWithId, motoMockUpdated, motoMockUpdatedWithId } from '../../mocks/motoMock';
import { IMotorcycle } from '../../../interfaces/IMotorcycle';

describe('Motorcycle Model', () => {
  const motoModel = new MotoModel();
  const motosList = [motoMockWithId];

  before(() => {
    sinon.stub(Model, 'create').resolves(motoMockWithId);
    sinon.stub(Model, 'findOne').resolves(motoMockWithId);
    sinon.stub(Model, 'find').resolves(motosList);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motoMockUpdatedWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(motoMockWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe('Creating a motorcycle', () => {
    it('Successfully created', async () => {
      const newMotorcycle = await motoModel.create(motoMock);

      expect(newMotorcycle).to.be.deep.equal(motoMockWithId);
    });
  });

  describe('Find a motorcycle', () => {
    it('Successfully found', async () => {
      const findMotorcycle = await motoModel.readOne('632369b560a8c92fe81b76b1');

      expect(findMotorcycle).to.be.deep.equal(motoMockWithId);
    });

    it('_id less characters', async () => {
      try {
        await motoModel.readOne('632369b560a8c92fe81');
      } catch (error: any) {
        expect(error.message).to.be.eq('FewCharacters');
      }
    });

    it('_id not found', async () => {
      try {
        await motoModel.readOne('999999999999999999999999');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidId');
      }
    });
  });

  describe('Find all motorcycles', () => {
    it('Successfully found', async () => {
      const motorcyclesFound = await motoModel.read();
      expect(motorcyclesFound).to.be.an('array');

      motorcyclesFound.forEach((car: IMotorcycle, index: number) => {
        expect(car).to.be.deep.equal(motosList[index]);
      });
    });
  });

  describe('Update a motorcycle', () => {
    it('Successfully updated', async () => {
      const motorcycleUpdated = await motoModel.update('632369b560a8c92fe81b76b1', motoMockUpdated);

      expect(motorcycleUpdated).to.be.deep.equal(motoMockUpdatedWithId);
    });

    it('_id less characters', async () => {
      try {
        await motoModel.update('632369b560a8c92fe81', motoMockUpdated);
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidId');
      }
    });

    it('_id not found', async () => {
      try {
        await motoModel.update('999999999999999999999999', motoMockUpdated);
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidId');
      }
    });
  });

  describe('Deleting a motorcycle', () => {
    it('Successfully deletion', async () => {
      const motorcycleDeleted = await motoModel.delete('632369b560a8c92fe81b76b1');

      expect(motorcycleDeleted).to.be.deep.equal(motoMockWithId);
    });

    it('_id less characters', async () => {
      try {
        await motoModel.delete('632369b560a8c92fe81');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidId');
      }
    });

    it('_id not found', async () => {
      try {
        await motoModel.delete('999999999999999999999999');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidId');
      }
    });
  });
});