const { ApolloServer, gql } = require("apollo-server");

// RULE 5   : Group closely related fields together into their sub object
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
    featureSet: GroupFeaturesSet # nullable to handle manual group
    cars: [Car!]!
    name: String!
    imageId: ID!
    bodyHtml: String!
    
  }

  #rule 5

  type GroupFeaturesSet{

    features: [GroupFeatures!]! #works fine for automatic group, but what about manual group, when we supply empty arrays
    applyFeatureSeparately: Boolean! # problem for manual group, since we dont apply anything. 

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
