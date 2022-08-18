const { ApolloServer, gql } = require("apollo-server");

// RULE 11  : Write separate mutation for a separate logical actions on a resource
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

  # split up mutation based on their logical actions on a resource

  type Mutation{
    create
    delete
    update
    publish 
    unpublish

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
