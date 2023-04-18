const {Router} = require('express')
const router = Router()
const { ProductManager }  = require('../DAO/ProductManager.js')
const prod = new ProductManager()



router.get('/', async(req, res) =>{  //Página HOME
    
    const productos =  await prod.getProducts() //Obtener lista de producto
    let datos = { listaProductos: productos  } //Array
    res.render('home', datos) //Cuando este en home, pasarle la lista de productos
})

router.get('/realtimeproducts', async(req, res) =>{ //Página REALTIMEPRODUCTS
    
    const productos =  await prod.getProducts()
    let datos = { listaProductosLive: productos }
    res.render('realTimeProducts', datos)
})


module.exports = router