import { expect } from 'chai';
import sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car.service';
import { carMock, carMockWithId, carMockUpdated, carMockUpdatedWithId, allCarMock } from '../../mocks/carMock';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves(allCarMock);
    sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(carMockWithId)
      .onCall(3).resolves(carMockWithId);
    sinon.stub(carModel, 'update').resolves(carMockUpdatedWithId);
    sinon.stub(carModel, 'delete').resolves(carMockWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe('Creating car', () => {
    it('Successfully creation', async () => {
      const carCreated = await carService.create(carMock);

      expect(carCreated).to.be.deep.equal(carMockWithId);
    });

    it('Creation failure', async () => {
      try {
        await carService.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
  });

  describe('Find a car', () => {
    it('Successfully found', async () => {
      const findCar = await carService.readOne('632369b560a8c92fe81b76b1');

      expect(findCar).to.be.deep.equal(carMockWithId);
    });
    
    it('Search failed', async () => {
      try {
        await carService.readOne('632369b560a8c92fe81');
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.FewCharacters);
      }
    });
  });

  describe('Find all cars', () => {
    it('Successfully found', async () => {
      const allCars = await carService.read();

      expect(allCars).to.be.deep.equal(allCarMock);
    });
  });

  describe('Update a car', () => {
    it('Successfully updated', async () => {
      const carUpdated = await carService.update('632369b560a8c92fe81b76b1', carMockUpdated);

      expect(carUpdated).to.be.deep.equal(carMockUpdatedWithId);
    });

    it('Updated failed', async () => {
      try {
        await carService.update('632369b560a8c92fe81b76b1', {} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    })
  });

  describe('Deleting a car', () => {
    it('Successfully deletion', async () => {
      const carDeleted = await carService.delete('632369b560a8c92fe81b76b1');
      
      expect(carDeleted).to.be.deep.equal(carMockWithId);
    });
  });
});