import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import { carMock, carMockWithId, carMockUpdated, carMockUpdatedWithId } from '../../mocks/carMock';
import { ICar } from '../../../interfaces/ICar';

describe('Car Model', () => {
  const carModel = new CarModel();
  const carsList = [carMockWithId];

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves(carsList);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockUpdatedWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe('Creating a car', () => {
    it('Successfully created', async () => {
      const newCar = await carModel.create(carMock);

      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('Find a car', () => {
    it('Successfully found', async () => {
      const findCar = await carModel.readOne('632369b560a8c92fe81b76b1');

      expect(findCar).to.be.deep.equal(carMockWithId);
    });

    it('_id less characters', async () => {
      try {
        await carModel.readOne('632369b560a8c92fe81');
      } catch (error: any) {
        expect(error.message).to.be.eq('FewCharacters');
      }
    });

    it('_id not found', async () => {
      try {
        await carModel.readOne('999999999999999999999999');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidId');
      }
    });
  });

  describe('Find all cars', () => {
    it('Successfully found', async () => {
      const carsFound = await carModel.read();
      expect(carsFound).to.be.an('array');

      carsFound.forEach((car: ICar, index: number) => {
        expect(car).to.be.deep.equal(carsList[index]);
      });
    });
  });

  describe('Update a car', () => {
    it('Successfully updated', async () => {
      const carUpdated = await carModel.update('632369b560a8c92fe81b76b1', carMockUpdated);

      expect(carUpdated).to.be.deep.equal(carMockUpdatedWithId);
    });

    it('_id less characters', async () => {
      try {
        await carModel.update('632369b560a8c92fe81', carMockUpdated);
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidId');
      }
    });

    it('_id not found', async () => {
      try {
        await carModel.update('999999999999999999999999', carMockUpdated);
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidId');
      }
    });
  });

  describe('Deleting a car', () => {
    it('Successfully deletion', async () => {
      const carDeleted = await carModel.delete('632369b560a8c92fe81b76b1');

      expect(carDeleted).to.be.deep.equal(carMockWithId);
    });

    it('_id less characters', async () => {
      try {
        await carModel.delete('632369b560a8c92fe81');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidId');
      }
    });

    it('_id not found', async () => {
      try {
        await carModel.delete('999999999999999999999999');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidId');
      }
    });
  });
});