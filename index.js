const { ApolloServer, gql } = require("apollo-server");

// RULE 7   : Always use object references instead of ID fields
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
    # imageId: ID!  #pretty useless from client side, to get the imageId , we just want the image itself. 
    # should never refer to foreign ID
    image: Image!
    bodyHtml: String!
    
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
