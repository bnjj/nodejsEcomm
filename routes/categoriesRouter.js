const express = require('express');
const faker = require('faker');

const router = express.Router();


router.get('', (req, res) => {

  const categories = [];
  const { size } = req.query;
  const limit = size || 10
  for(let i = 0 ; i < limit ; i++)
  {
    categories.push(
      {
        categoryId : i,
        categoryName : faker.random.word()


      }
    )
  }
  res.json(categories)

})

router.get('/filter', (req,res) =>
{
  res.send('Yo soy un filter');
});

router.get('/:id', (req, res) => {

  var category = categories[req.params.id-1];
  if (category) {
  res.json(categories);
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


     var categoryId = req.params.id;
     var categoryId = req.params.categoryName;

     var categoriesModificar = {
      categoryId : req.params.id,
      categoryName : req.params.categoryName

      }

     categories[categoryId]=categoriesModificar;
     res.end( JSON.stringify(categories));

})

router.delete('/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);
  categories = categories.filter(categories => categories.id !== categoryId);
  res.status(204).end();
});









module.exports = router;
