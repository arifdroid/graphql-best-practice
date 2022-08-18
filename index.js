const { ApolloServer, gql } = require("apollo-server");

// RULE 13  : Prefix mutation names with the object they are mutating for alphabetical grouping
// explain  :  
//          : 
//          : 
//          : 

const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  # common convention

  # group<Action>
  # <action> Group

  type Mutation{
    
    groupDelete(groupId: ID!)
    groupPublish(groupId: ID!)
    groupUnpublish(groupId: ID!)
    groupAddCars(groupId: ID!, carId:ID!)
    groupRemoveCars(groupId: ID!, carId:ID!)
    
    groupCreate(
      name: String!
      image: ImageInput!
      description: String!
      featureSet: GroupFeatureFields
    )
    groupUpdate
    
  }

  input ImageInput{
    url: String!
  }

  type Group{    
    id: ID!
    featureSet: GroupFeaturesSet 
    cars (skip: Int! , take: Int!): [Car!]!
    hasCar(id: ID!): Boolean!
    name: String!    
    image: Image!    
    description: String!
    
  }

  type Image{
    id: ID!
    url: String!
  }

  type GroupFeaturesSet{
    features: [GroupFeatures!]! 
    applyFeatureSeparately: Boolean! 
  }

  
  type GroupFeatures{    
    feature: [GroupFeatureFields!]
  }

  enum GroupFeatureFields{
      INCLINE_ENGINE
      FOUR_CYLINDER_ENGINE
      TWIN_CYLINDER_ENGINE
      RED_PAINT
      BLACK_PAINT
  }

`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [{ id: 1, color: "blue", make: "Toyota" }],
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
