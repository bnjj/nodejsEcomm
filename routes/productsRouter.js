const express = require('express');
const faker = require('faker');

const router = express.Router();


router.get('', (req, res) => {

  const productos = [];
  const { size } = req.query;
  const limit = size || 10
  for(let i = 0 ; i < limit ; i++)
  {
    productos.push(
      {

        name : faker.commerce.productName(),
        price : parseInt(faker.commerce.price(), 10),
        image : faker.image.imageUrl()

      }
    )
  }
  res.json(productos)

})

router.get('/filter', (req,res) =>
{
  res.send('Yo soy un filter');
});

router.get('/:id', (req, res) => {

  var producto = productos[req.params.id-1];
  if (producto) {
  res.json(productos);
  }
  else
  {

    return res.status(404).send('producto no existe');
  }

})












/* app.post('/productos', (req, res) => {
  var newProducto = {
    producto :req.body.producto,
    precio: req.body.precio
    }

    clientes.push(newProducto);
    res.json(productos);


}) */

router.put("/:id", function(req, res) {


     var productoid = req.params.id;

     var productoModificar = {
      producto:  req.body.producto,
      precio: req.body.precio
      }

     productos[productoid]=productoModificar;
     res.end( JSON.stringify(productos));

})

router.delete('/:id', (req, res) => {
  const productoId = parseInt(req.params.id);
  productos = productos.filter(productos => productos.id !== productoId);
  res.status(204).end();
});









module.exports = router;
