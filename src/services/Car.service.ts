/* import { isValidObjectId } from 'mongoose'; */
import IService from '../interfaces/IService';
import { ICar, CarSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
/* import { ErrorTypes } from '../errors/catalog'; */

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: unknown): Promise<ICar> {
    const parsed = CarSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    return this._car.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    const cars = await this._car.read();

    /* if (!cars) throw new Error(ErrorTypes.algumacoisa); */

    return cars;
  }

  public async readOne(_id: string): Promise<ICar | null> {
    const car = await this._car.readOne(_id);

    return car;
  }

  public async update(_id: string, obj: ICar): Promise<ICar | null> {
    const parsed = CarSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    await this.readOne(_id);

    return this._car.update(_id, obj);
  }

  public async delete(_id: string): Promise<ICar | null> {
    await this.readOne(_id);
    
    return this._car.delete(_id);
  }
}

export default CarService;