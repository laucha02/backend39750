//Importación de clase ProductManager
const { ProductManager }  = require('../../DAO/ProductManager.js')
const manager = new ProductManager()

const socketProducts = async(io) =>{ //Obtener productos
    const products = await manager.getProducts()
    // console.log(products)
    io.on('connection', socket =>{ 
        console.log('Cliente conectado') 
        socket.emit('productos', products)
    })
}


//Exportación de función socketProducts
module.exports = { socketProducts }