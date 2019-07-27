const User = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
                const usuarios = await User.find();
                return usuarios;
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
        login: async(_, { input }) => {
            const user = await User.findOne({nombre: input.nombre});
            if(user) {                
                const verificar = await bcrypt.compare(input.password, user.password);
                if(verificar){
                    var token = await jwt.sign({ user }, 'secretomio');
                    return {token};
                } else {
                    throw new Error('la contraseña es incorrecta');
                }
            }
            if(!user){
                console.log('noooo');
                throw new Error('Usuario No Existe');
            }
        },
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
        },
        register: async(_, {input}) => {
            const userDB = await User.findOne({nombre: input.nombre});
            if(userDB){
                throw new Error('el usuario esta registrado');
             }
            try {
                const password = await bcrypt.hash(input.password, 10);
                const user = new User({
                    nombre: input.nombre,
                    edad: input.edad,
                    password: password
                });
                const usuarioGuardado = await user.save();
                return usuarioGuardado;
            } catch (err) {
                throw new Error('A ocurrio un error');
            }   
        }
    }
};

module.exports = resolvers;