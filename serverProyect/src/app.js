const express = require('express')
const handlebars = require ('express-handlebars')
// Importamos los routes de la api
const productRouter = require ('./routers/products.router')
const RouterCar = require ('./routers/carts.router')
const viewStatic = require ('./routers/views.router')
//importamos el server 
const { Server } = require('socket.io') 
const {socketProducts} = require ('./public/js/socketproducts')

const app = express()
const PORT = 8080


// Inicia el servidor
const httpServer = app.listen(PORT, ()=>{
    console.log(`Escuchando el puerto: ${PORT}`)
})

//Creación de los middlewares 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static('./src/public'))




//Router de los productos
app.use('/api/products', productRouter)
////
//Router del carrito
app.use('/api/carts', RouterCar)




//Configuración de motor de plantillas (Handlebars)
app.engine('handlebars',handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
app.use('/', viewStatic)
app.use('/realtimeproducts', viewStatic)

const io = new Server(httpServer)
socketProducts(io)
