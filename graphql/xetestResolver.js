const vehicles = [
  { name: "Car A", model: "Model X", yearOfManufacturing: "2020" },
  { name: "Car B", model: "Model Y", yearOfManufacturing: "2021" },
];

const resolvers = {
  Query: {
    getVehicle: (_, { name }) => vehicles.find((vehicle) => vehicle.name === name),
    listVehicles: () => vehicles,
  },
  Mutation: {
    addVehicle: (_, { input }) => {
      const newVehicle = { ...input };
      vehicles.push(newVehicle);
      return newVehicle;
    },
  },
};

module.exports = resolvers;