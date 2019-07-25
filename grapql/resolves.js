const User = require('../models/usuarioModel');

const resolvers = {
    Query: {
        total: async() => {
            try {
                return await User.countDocuments();
            } catch (err) {
                return null
            }
        },
        allUsuario: async(root, args) => {
            // los argumentos son todo lo que pasas es un objeto
        // allUsuario: (root, { id }) => {
            console.log(args);
            // console.log(id);
            try {
                return await User.find();
            } catch (err) {
                console.log(err);
                return null;
            }
        },
        paginacion: async(_, { first }) => {
            try {
                return await User.find()
                    .limit(10)
                    .skip(first);
            } catch (err) {
                return null
            }
        }
    },

    Mutation: {
        // crearUsuario: (_, { input }, ctx) => {
        crearUsuario: async(_, { input }) => {
            console.log(input);
            try {
                const user = await new User(input);
                return await user.save();
            } catch (err) {
                console.log(err);
                return null;
            }
        },
        updateUsuario: async(_, { id, input }) => {            
            try {
                return await User.findOneAndUpdate({_id:id}, input, {new:true});
                // return user;
            } catch (err) {
                console.log(err);
                return null;
            }
        },
        eliminarUsuario: async(_, { id }) => {
            try {
                return await User.findOneAndDelete({ _id: id });
                // console.log(user);
                
            } catch (err) {
                console.log(err);
                return err;
            }
        }
    }
};

module.exports = resolvers;