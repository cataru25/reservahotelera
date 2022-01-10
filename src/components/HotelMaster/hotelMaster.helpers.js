import _filter from "lodash/filter";
import _map from "lodash/map";

const pequeno = '1';
const mediano = '2';
const grande = '3';
const noRooms = 0;
const plentyOfRooms = 10;
const lotsOfRomms = 20;

const cloneArray = (baseArray) => _map(baseArray, (hotel) => ({ ...hotel }));

export const equalityFilter = (baseArray, key, value) => {
  if (value !== 'Cualquier precio' && value !== 'Todos los países') {
    const clonedBaseArray = cloneArray(baseArray);
    const filteredDataEqualy = _filter(clonedBaseArray, (hotel) => {
      return hotel[key] === value || hotel[key] === parseInt(value, 10);
    });
    return filteredDataEqualy;
  }
  return baseArray;
};

export const dateFilter = (baseArray, key, value) => {
    const valueAsNumber = parseInt(value, 10);
    const clonedBaseArray = cloneArray(baseArray);
    const filteredDateRange = _filter(clonedBaseArray, hotel => {
      const currentValueForKey = hotel[key];
      if (key.includes("From")) {
        return currentValueForKey <= valueAsNumber && hotel.availabilityTo >= valueAsNumber;
      }
      if (key.includes("To")) {
        return hotel.availabilityFrom <= valueAsNumber && currentValueForKey >= valueAsNumber;
      }
      return false;
    });
    return filteredDateRange;
};

// Pequeño para hoteles con hasta 10 camas, 0 < x <= 10
// Mediano para hoteles con 11 camas hasta 19 camas, 10 < x < 20
// Gande para hoteles con mas de 20 camas, x > 20
export const roomsRangeFilter = (baseArray, key, value) => {
  if ((value === pequeno) || (value === mediano) || (value === grande)) {
    const clonedBaseArray = cloneArray(baseArray);
    const filteredRooms = _filter(clonedBaseArray, hotel => {
      const currentValueForKey = hotel[key];
      if (value === pequeno) {
        return noRooms < currentValueForKey && currentValueForKey <= plentyOfRooms;
      }
      if (value === mediano) {
        return plentyOfRooms < currentValueForKey && currentValueForKey <= lotsOfRomms;
      }
      if (value === grande) {
        return currentValueForKey > lotsOfRomms;
      }
      return true;
    });
    return filteredRooms;
  }
  return baseArray;
}
