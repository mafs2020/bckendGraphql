const jwt = require('jsonwebtoken');


// try {
//     var decoded = jwt.verify(token, 'wrong-secret');
//   } catch(err) {
//     // err
//   }

const isAuth = async (req, res, next) => {
    console.log('este es el middlware');

    next();
};


module.exports = isAuth;