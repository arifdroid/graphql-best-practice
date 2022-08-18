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
    [GroupMembership]   # this is the reference connection , we dont need reference , we need the actual results 
  }
  
  type AutomaticGroup{    
    Image
    [GroupMembership]    
    [AutomaticGroupFeatures]    
  }

  type AutomaticGroupFeatures{    
  }

  # to handle table relationship, 
  type GroupMembership{  # RULE 2 , is this type reallly usefull for our application
    Group
    Car
    

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
