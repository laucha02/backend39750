const fs = require('fs')


class CartManager {
    constructor() {
        this.carts = [];
        this.path = './src/DAO/carts.json';
    }

    async __appendCart()  {   

        const toJSON = JSON.stringify(this.carts, null, 2); 
        await fs.promises.writeFile(this.path, toJSON)        
    };

    async getCarts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(data)
        } catch (err) {
            return { status: "error", error: err }
        }
    };


    getCartById = async (id) => {
        try {

            const data = await fs.promises.readFile(this.path, 'utf-8')
            const dataParseada = JSON.parse(data);

            if (!dataParseada[id - 1]) return { error: 'Error! El carrito No existe' }

            return dataParseada[id - 1]
        }
        catch (err) {
            return { status: "error", error: err }
        }
    }


    addCart = async (newCart) => {
        try {

            const carts = await this.getCarts();
            this.carts = carts

            
            newCart.id = this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1;

            if (Object.values(newCart).every(value => value)) {
                this.carts.push(newCart);
                this.__appendCart();
            }

            return [];
        }
        catch (err) {
            return { status: "error", error: err }
        }

    }



   

    updateCart = async (cid, changes) => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const dataParseada = JSON.parse(data);
            const indexCarrito = dataParseada.findIndex((prod) => prod.id == cid)


            if (isNaN(Number(pid))) return { status: "error", message: 'No es un id válido' };

    
            if (indexCarrito === -1) return { status: "error", message: 'No se encontró el id' };


            dataParseada[indexCarrito] = Object.assign(dataParseada[indexCarrito], changes)
            

            this.__appendCart();
            return {
                status: "success",
                message: "El producto con id ${id} ha sido modificado correctamente"
              }
        }
        catch (err) {
            console.log(err);
        }

    }
}

/* const carritos = new CartManager()
 const testing = async () => { const carrito = {
     productos: [
        {
            idProduct: 1,
            cantidad: 10
        },
        {
            idProduct: 4,
            cantidad: 11
        }
    ] }
await carritos.addCart(carrito) } testing()
*/


module.exports = { CartManager };