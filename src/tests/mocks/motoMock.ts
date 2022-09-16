import { IMotorcycle } from "../../interfaces/IMotorcycle";

const motoMock: IMotorcycle = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
};

const allMotoMock: IMotorcycle[] & { _id: string }[] = [
  {
    _id: "4edd40c86762e0fb12000003",
    model: "Honda CG Titan 125",
    year: 1963,
    color: "red",
    buyValue: 3500,
    category: "Street",
    engineCapacity: 125
  },
  {
    _id: "4edd40c86762e0fb12000004",
    model: "Yamaha CG Titan 007",
    year: 1970,
    color: "blue",
    buyValue: 4500,
    category: "Custom",
    engineCapacity: 225
  },
];

const motoMockWithId: IMotorcycle & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
};

const motoMockUpdated: IMotorcycle = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "yellow",
  buyValue: 4500,
  category: "Trail",
  engineCapacity: 125
};

const motoMockUpdatedWithId: IMotorcycle  & { _id: string }= {
  _id: "4edd40c86762e0fb12000003",
  model: "Honda CG Titan 125",
  year: 1963,
  color: "yellow",
  buyValue: 4500,
  category: "Trail",
  engineCapacity: 125
};

export {
  motoMock,
  motoMockWithId,
  motoMockUpdated,
  motoMockUpdatedWithId,
  allMotoMock,
};