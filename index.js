const { ApolloServer, gql } = require("apollo-server");

// RULE 6   : Always check whether list fields should be paginated or not
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
    # cars: [Car!]! #this is problematic since we might return thousands of results, very hard to sort in FE, no point send all at once, useless
    cars (skip: Int! , take: Int!): [Car!]! 
    name: String!
    imageId: ID!
    bodyHtml: String!
    
  }

  #rule 5

  type GroupFeaturesSet{
    features: [GroupFeatures!]! 
    applyFeatureSeparately: Boolean! 
  }

  type GroupFeatures{    
    feature: String
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
