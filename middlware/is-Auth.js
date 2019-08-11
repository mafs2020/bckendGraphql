const jwt = require('jsonwebtoken');


// try {
//     var decoded = jwt.verify(token, 'wrong-secret');
//   } catch(err) {
//     // err
//   }

const isAuth = async (req, res, next) => {
    console.log('este es el middlware');
    // console.log(req.params);
    next();
};


module.exports = isAuth;