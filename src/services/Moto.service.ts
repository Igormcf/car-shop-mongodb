import IService from '../interfaces/IService';
import { IMotorcycle, MotorcycleSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';

class MotoService implements IService<IMotorcycle> {
  private _moto: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._moto = model;
  }

  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsed = MotorcycleSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    return this._moto.create(parsed.data);
  }

  public async read(): Promise<IMotorcycle[]> {
    const motos = await this._moto.read();

    return motos;
  }

  public async readOne(_id: string): Promise<IMotorcycle | null> {
    const moto = await this._moto.readOne(_id);

    return moto;
  }

  public async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle | null> {
    const parsed = MotorcycleSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    await this.readOne(_id);

    return this._moto.update(_id, obj);
  }

  public async delete(_id: string): Promise<IMotorcycle | null> {
    await this.readOne(_id);

    return this._moto.delete(_id);
  }
}

export default MotoService;