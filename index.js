const express = require('express');
const app = express();
const multer = require('multer');
const morgan = require('morgan');
const upload = multer({ dest: 'img/' });
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const schema = require('./grapql/schema');
require('./db/conexion');
const User = require('./models/usuarioModel');
const isAuth = require('./middlware/is-Auth');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(isAuth);

app.post('/', upload.single('img'), (req, res) => {
    console.log('req.file', req.file);
    // console.log('req.files.img', req.files.img);
    console.log('llego');
    res.json('llego');
});


app.post('/usuario', async (req, res) => {
  try {
    const usuario = new User({ nombre: 'juan', edad: 23, password: '123456' });
    const user = await usuario.save();
    return res.json({usuario:user});
  } catch (err) {
    return res.status(400).json({ok:false, msj: 'ocurrio un error', err});
  }
});


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true,
  // context: 
}));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => console.log('server on port '+ app.get('port')));