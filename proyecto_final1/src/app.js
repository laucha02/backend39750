//Importación de módulos con import
import express from 'express';
import productRouter from '../src/routers/products.router.js';
import routerCar from './routers/carts.router.js';


//Importación de módulos con const (error por el require)
// const express = require('express');
// const productRouter = require('../src/routers/products.router.js');
// const routerCar = require('../src/routers/carts.router.js');



//Creación de instancia utilizando app
const app = express();


//Creación de los middlewares 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static',express.static('./src/public'));


//Router del carrito
app.use('/api/carts', routerCar);


//Router de los productos
app.use('/api/products', productRouter);


// Inicia el servidor
app.listen(8080, () => {
    console.log('Escuchando en el puerto 8080');
});
