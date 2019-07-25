const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolves');
// allUsuario(id: Int): [Int!]!
const typeDefs = `

    type Usuario {
        id: ID!
        nombre: String!
        edad: Int!
        password: String!
    }
    
    input UsuarioInput{
        nombre: String
        edad: Int
        password: String
    }
    
    type Query{
        total: Int!
        allUsuario(id: Int): [Usuario!]!
        paginacion(first: Int): [Usuario!]!
    }

    type Mutation{
        crearUsuario(input: UsuarioInput!): Usuario!
        updateUsuario(id: ID!, input: UsuarioInput!): Usuario
        eliminarUsuario(id: ID!): Usuario
    }
    
`;

module.exports = makeExecutableSchema({typeDefs, resolvers});