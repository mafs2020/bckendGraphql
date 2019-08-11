const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolves');
// allUsuario(id: Int): [Int!]!
const typeDefs = `

    type Usuario {
        id: ID!
        nombre: String
        edad: Int
        password: String
    }
    
    input UsuarioInput{
        nombre: String
        edad: Int
        password: String
    }

    input Login {
        nombre: String
        password: String
    }
    type LoginDatos{
        usuario: Usuario
        token: String
    }
    
    type Query{
        total: Int!
        allUsuario(id: Int): [Usuario!]!
        paginacion(first: Int): [Usuario!]!
        usuario(id: ID): Usuario
    }
    type Token {
        token: String
    }

    type Mutation{
        login(input: Login): Token
        register(input: UsuarioInput): Usuario
        crearUsuario(input: UsuarioInput): Usuario
        updateUsuario(id: ID, input: UsuarioInput): Usuario
        eliminarUsuario(id: ID): Usuario
    }
    
`;

module.exports = makeExecutableSchema({typeDefs, resolvers});