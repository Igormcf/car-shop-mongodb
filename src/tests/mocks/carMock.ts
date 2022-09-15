import { ICar } from "../../interfaces/ICar";

const carMock: ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  doorsQty: 2,
  seatsQty: 2,
};

const allCarMock: ICar[] & { _id: string }[] = [
  {
    _id: "632369b560a8c92fe81b76b1",
    model: "Ferrari Maranello",
    year: 1963,
    color: "red",
    buyValue: 3500000,
    doorsQty: 2,
    seatsQty: 2,
  },
  {
    _id: "632369b560a8c92fe81b76b2",
    model: "Corolla",
    year: 1970,
    color: "blue",
    buyValue: 4000000,
    doorsQty: 4,
    seatsQty: 4,
  },
];

const carMockWithId: ICar & { _id: string } = {
  _id: "632369b560a8c92fe81b76b1",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  doorsQty: 2,
  seatsQty: 2,
};

const carMockUpdated: ICar = {
  model: "Ferrari Maranello",
  year: 1980,
  color: "yellow",
  buyValue: 3500000,
  doorsQty: 2,
  seatsQty: 2,
};

const carMockUpdatedWithId: ICar  & { _id: string }= {
  _id: "632369b560a8c92fe81b76b1",
  model: "Ferrari Maranello",
  year: 1980,
  color: "yellow",
  buyValue: 3500000,
  doorsQty: 2,
  seatsQty: 2,
};

export {
  carMock,
  carMockWithId,
  carMockUpdated,
  carMockUpdatedWithId,
  allCarMock,
};