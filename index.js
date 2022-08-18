const { ApolloServer, gql } = require("apollo-server");

// manual group is the one we manually group it together
// automatic group is automatically added based on features we specified
//right now have only 1 group, slit to 2
//naive approach
//now many to many relationship


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
    id: ID!
    name: String!
    imageId: ID!
    bodyHtml: String!
  }
  
  type AutomaticGroup{
    id: ID!
    name: String!
    imageId: ID!
    bodyHtml: String!
    feature: [AutomaticGroupFeatures!]!
    applyFeaturesSeparately: Boolean!
  }

  type AutomaticGroupFeatures{
    column: String!
    
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
