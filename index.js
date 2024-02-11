const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hola mi server en express.');
})


routerApi(app);

app.use(express.json());




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
