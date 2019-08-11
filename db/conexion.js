const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/grapql', {useNewUrlParser: true, useFindAndModify: false})
// useCreateIndex: true
// https://mongoosejs.com/docs/deprecations.html#-findandmodify-
    .then(() => console.log('se conecto a la DB'))
    .catch(err => console.log('ocurrio un error en la DB', err));

// (async() => {

//     try {
//         await mongoose.connect('mongodb://localhost:27017/grapql', {useNewUrlParser: true});
//         console.log('se conecto a la DB');
//     } catch (err) {
//         console.log(err);
//         console.log('ocurrio un error');
//     }
// })();