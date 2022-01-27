const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/categories/:categoryid/products/:productid',(req, res)=>{
  const{ categoryid, productid }  = req.params;
  res.json({
    categoryid,
    productid
  })
});

module.exports = router;
