const express = require('express');
const ProductService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validatorHandler');
const { createProductSchema,updateProductSchema, getProductSchema } = require('./../schemas/products.schemas');

const router = express.Router();
const service = new ProductService();




router.get('/',async(req, res)=>{
  const products = await service.buscar();
res.json(products);
});



router.get('/filter', (req, res)=>{
  res.send('yo soy un filtro')
})



router.get('/:id',
validatorHandler(getProductSchema, 'params'),
  async (req, res, next)=>{
  try {
    const { id }= req.params;
    const product = await service.buscarUno(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/',async(req, res)=>{
  const body = req.body;
  const newProduct = await service.create(body);

  res.status(201).json(newProduct)
});

router.patch('/:id',async(req, res)=>{
  try {
    const { id }=req.params;
  const body = req.body;
  const product = await service.modificar(id, body);
  res.json({product})
  } catch (error) {
    next(error);
  }

})

router.delete('/:id',async(req, res)=>{
  const { id }=req.params;
  const product = await service.borrar(id)
  res.json({product})
})


module.exports = router;
