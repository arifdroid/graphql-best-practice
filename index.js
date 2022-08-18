const { ApolloServer, gql } = require("apollo-server");

// RULE 3   : Design your API around your business domain
// explain  : the end users dont car how cars get into a group, be it manual or automatic based on the features
//          : they just care, if they click on this, i should see a group of related cars
//          : thus type ManualGroup and AutomaticGroup expose implementation details and not necessary from user or business perspective
//          : so we remove both Manual And Auto Group, merge into one

const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  # for manual group, just supply empty array into GroupFeatures

  type AutomaticGroup{    
    Image
    [Car] 
    [GroupFeatures]    
  }

  type GroupFeatures{    
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
