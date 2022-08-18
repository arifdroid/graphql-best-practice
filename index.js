const { ApolloServer, gql } = require("apollo-server");

// RULE 2   : Never expose implementation details
// explain  : 

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
    name: String!
    imageId: ID!
    bodyHtml: String!
  }

  type ManualGroup{    
    Image
    [Car] # return data of car directly instead
  }
  
  type AutomaticGroup{    
    Image
    [Car] # return data of car directly instead
    [AutomaticGroupFeatures]    
  }

  type AutomaticGroupFeatures{    
  }

  #remove GroupMembership



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
