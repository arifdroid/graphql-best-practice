const { ApolloServer, gql } = require("apollo-server");

// RULE 4   : It's easier to add fields than to remove them
// explain  : remove can lead to breaking changes
//          : that's why important to check fields and type in schema first is it really necessary
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
    features: [GroupFeatures!]!
    applyFeatureSeparately: Boolean!
    cars: [Car!]!
    name: String!
    imageId: ID!
    bodyHtml: String!
    
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
