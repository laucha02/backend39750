const { default: router } = require('../proyectoFinal1/src/routers/products.router');
const ProductManager = require('./ProductManager');
const manager =  new ProductManager('./data.json')

const express = require('express')
const app = express()


app.use(express.urlencoded({ extended: true }));



// Endpoint de /products
router.get('/', async (request, response) => {

  try {

    const limit = request.query.limit
    const products = await manager.getProducts()
    response.status(200).send({products: products.slice(0, limit > products.length ? products.length : limit)})


  } catch (error) {
    
    response.status(400).send({
      status: 'Se ha producido un error del router',
      })
  
}})


//Endpoint de /products/id
router.get('/:pid', async (request, response) => {
  try {

    const id = request.params.pid
    const product = await manager.getProductById(parseInt(id))
    
    if (!product) {

      response.status(404).send({
        error: 'Producto no encontrado.'
      });
    }

    response.status(200).send(product);

  } catch (error) {
    response.send({
      error: 'Se ha producido un error.'
    }); 
  }
});


app.listen (8080, ()=>{
    console.log('Escuchando en el puerto 8080')

})
