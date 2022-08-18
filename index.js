const { ApolloServer, gql } = require("apollo-server");

// RULE 9   : Use Enums for fields which can only take a specific set of values
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

  type Group{    
    id: ID!
    featureSet: GroupFeaturesSet 
    cars (skip: Int! , take: Int!): [Car!]! 
    name: String!    
    image: Image!
    # bodyHtml: String!  #the name of the fields weird, 
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

  # we only have a set number of features, we should only able to pick one of the many features, we should use enum values
  type GroupFeatures{    
    feature: String!
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
