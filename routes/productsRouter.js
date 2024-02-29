const express = require('express');

const ProductsService = require('./../services/productsService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/productSchema');
const router = express.Router();

const service = new ProductsService();



router.get('', async (req, res) => {

  const products =await service.find()
  res.json(products)

})

router.get('/filter', (req,res) =>
{
  res.send('Yo soy un filter');
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {

  try {

    const { id } = req.params;
    const product =await service.findOne(id);
    res.json(product);

  } catch(error) {
      next(error);
  }
});








  router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {

    const body = req.body

    const newProduct =await service.create(body);




    res.status(201).json({

      message: 'created',
      data: newProduct


    });


  })

  router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema , 'body'),
  async (req, res) => {

  try {
    const { id } = req.params
    const body = req.body
    const product =await service.update(id,body);

    res.json(product);
      }
  catch(error) {
    res.status(404).json({
    message :error.message
  })
}



  })
/*
router.put("/:id", function(req, res) {


     var productoid = req.params.id;

     var productoModificar = {
      name:  req.body.producto,
      price: req.body.precio,
      img : '404'
      }

     productos[productoid]=productoModificar;
     res.end( JSON.stringify(productos));

}) */

router.delete('/:id',
  validatorHandler(getProductSchema,'params'),
  async (req, res) => {
  const { id } = req.params.id
  const rta =await service.delete(id);
  res.json(rta);
});









module.exports = router;
