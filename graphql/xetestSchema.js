type Vehicle {
  name: String!
  model: String!
  yearOfManufacturing: String!
}

input VehicleInput {
  name: String!
  model: String!
  yearOfManufacturing: String!
}

type Query {
  getVehicle(name: String!): Vehicle
  listVehicles: [Vehicle!]!
}

type Mutation {
  addVehicle(input: VehicleInput!): Vehicle
}