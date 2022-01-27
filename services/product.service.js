const faker = require('faker');
const boom = require('@hapi/boom');



class ProductService{
  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 100;
      for(let index=0;index<limit; index++){
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        precio: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }

  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }



buscar(){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve(this.products);
      },2000);
    })
}

  async buscarUno(id){

    const product = this.products.find(item => item.id === id);

    return product;
  }

  async modificar(id, changes){
    const index = this.products.findIndex(item=>item.id===id);
    if(index ===-1){
      throw boom.notFound('producto no encontrado');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }


  async borrar(id){
    const index = this.products.findIndex(item=>item.id===id);
    if(index ===-1){
      throw boom.notFound('producto no encontrado');
    }
    this.products.splice(index,1);
    return {id};
  }
}


module.exports = ProductService;
