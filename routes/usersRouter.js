const express = require('express');
const faker = require('faker');

const router = express.Router();


router.get('', (req, res) => {

  const users = [];
  const { size } = req.query;
  const limit = size || 10
  for(let i = 0 ; i < limit ; i++)
  {
    var persona = faker.name.firstName() +' '+faker.name.lastName()

    users.push(
      {

        name : persona,
        email : persona.replace(/\s/g, '') + Math.floor(Math.random() * 9)  + '@mystore.com'

      }
    )
  }
  res.json(users)

})

router.get('/filter', (req,res) =>
{
  res.send('Yo soy un filter');
});

router.get('/:id', (req, res) => {

  var user = productos[req.params.id-1];
  if (user) {
  res.json(users);
  }
  else
  {

    return res.status(404).send('usuario no existe');
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


     var userId = req.params.id;

     var userModificar = {
      name:  req.body.name,
      email: req.body.email
      }

     users[userId]=userModificar;
     res.end( JSON.stringify(users));

})

router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter(users => users.id !== userId);
  res.status(204).end();
});









module.exports = router;
