
const { Router }= require ('express')
const routerCar = Router()
const { CartManager }  = require('../DAO/cartsManager.js')
const manager = new CartManager()


routerCar.get('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await manager.getCartById(cid);

        if (cart.error) {
            return res.status(404).send({
                status: 'error',
                message: 'El carrito no existe',
            });
        }

        res.status(200).send({
            status: 'success',
            data: cart,
        });
    } catch (error) {
        console.log('Error', error);
        res.status(500).send({
            status: 'error',
            message: 'Error al buscar el carrito',
        });
    }
});

routerCar.post('/', async (req, res) => {
    try {

        const cart = req.body

        const NotmissingValues = Object.values(cart).every(value => value);


        if (!NotmissingValues) {
            return res.status(400).send({ status: "error", message: "Ha ocurrido un error: 1 o más campos no se completaron" })
        }

        const addedCart = await manager.addCart(cart);
        res.status(200).send({ status: "success", cart: addedCart });
    }
    catch (error) {
        console.log('Error', error);
        res.status(500).send({
            status: 'error',
            message: 'Error al buscar el carrito',
        });
    }

});

routerCar.post('/:cid/product/:pid', async (req, res) => {
    try {   
        let { producto } = req.body
        const { cid, pid } = req.params
        const indexProducto = carrito.productos.findIndex(prod => prod.idProduct == pid)
        const carrito = await manager.getCartById(cid)

        producto['idProduct'] = Number(pid)

        
        if (carrito.error) return res.status(400).send(carrito)

        if (indexProducto !== -1) {
            
            carrito.productos[indexProducto].cantidad = Number(carrito.productos[indexProducto].cantidad) + Number(producto.cantidad)
  
            await manager.updateCart(cid, carrito)
            return res.status(200).send({ statusbar: 'success', message: 'producto agregado'});
        }

        carrito.productos.push(producto)

        await manager.updateCart(cid, carrito)
        res.status(200).send({status: 'success', message: 'El producto ha sido agregado exitosamente', carrito: carrito.productos})
        
    } catch (error) {
        console.log('Error', error);
        res.status(500).send({
            status: 'error',
            message: 'Error al buscar el carrito',
        });
    }

})









module.exports = routerCar