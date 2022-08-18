const { ApolloServer, gql } = require("apollo-server");

// RULE 12  : For a relationship mutation, always consider whether it would be useful to operate on multiple elements at once
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

  # update mutation still relatively big , 
  # for example, it is responsible fo adding a car to a group, remove a car from a group

  type Mutation{
    create
    delete
    update
    publish 
    unpublish

    #we might want to add or remove one or multiple cars in mutation. 
    addCars
    removeCars
  
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
