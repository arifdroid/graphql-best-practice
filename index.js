const { ApolloServer, gql } = require("apollo-server");

// RULE 14  : Structure mutation inputs to reduce duplication, even if this requires relaxing requiredness constraints on certain fields
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

  type Mutation{
    
    groupDelete(groupId: ID!)
    groupPublish(groupId: ID!)
    groupUnpublish(groupId: ID!)
    groupAddCars(groupId: ID!, carId:ID!)
    groupRemoveCars(groupId: ID!, carId:ID!)
    
    #but now we have duplication groupCreate and groupUpdate
    groupCreate(
      groupInput: GroupInput! #this is relaxing the required fields, but this avoid code duplication
    )

    #for update , most are nullable
    groupUpdate(
      groupID: ID!
      groupInput: GroupInput!
    )
    
  }

  input GroupInput{    
      name: String
      image: ImageInput
      description: String
      featureSet: GroupFeatureFields
  }

  input ImageInput{
    url: String!
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
