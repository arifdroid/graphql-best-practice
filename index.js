const { ApolloServer, gql } = require("apollo-server");

// RULE 15  : Mutation should provide user/business level errors via a userErrors field on the mutation payload
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
    
    
    groupCreate(
      groupInput: GroupInput! 
    ): 

    # groupUpdate(
    #   groupID: ID!
    #   groupInput: GroupInput!
    # ): Group # make it nullable , since mutation might not return error or group, we also want to return the error

    groupUpdate(
      groupID: ID!
      groupInput: GroupInput!
    ): GroupUpdatePayload
    
  }

  type GroupUpdatePayload{
    group: Group
    userErrors:[UserErrors!]!
  }

  type UserErrors{
    message: String!
    field: [String!]!
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
