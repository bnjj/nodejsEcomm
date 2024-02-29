const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const { boomErrorHandler,logErrors,errorHandler } = require('./middlewares/errorhandler');

const app = express();
const port = process.env.port || 3000;

app.use(express.json());


const whitelist = ['http://127.2.0.1:5100/frontend.html','http:/myapp.co']
const options = {
  origin: (origin,callback) => {
      if(whitelist.includes(origin)) {
        callback(null,true);

      }else {
        callback(new Error('no permitido'));
      }
  }
}
app.use(cors(options));
app.get('/', (req, res) => {
  res.send('Hola mi server en express.');
})


routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);




app.get('/categories/:categoryId/productos/:productoId', (req,res) => {

  const { categoryId ,productoId } = req.params;

  res.json({
    categoryId,
    productoId
  });



})


app.listen(port,() => {
  console.log('Mi port'+ port);
});
