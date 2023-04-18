//Importación de módulo
const fs = require('fs')


const promises = fs.promises


//Defino la clase ProductManager
class ProductManager {
    constructor() {
      this.path = './src/DAO/products.json'; //Ruta al archivo productos.json
      this.products = [];                     //Almacena los productos cargados desde el archivo
   };

   async __appendProduct()  {   //Defino método privado, agrega producto al json

    const toJSON = JSON.stringify(this.products, null, 2); //Conversión a JSON del array de productos
    await fs.promises.writeFile(this.path, toJSON)         //Lo escribe en el archivo
};


    async getProducts() {
        try {

            const data = await promises.readFile(this.path, "utf-8")
            const products = JSON.parse(data);
            return products

        } catch (err) {
            return { status: "error", error: err }
        }
    }

   
    

    getProductById = async (id) => {

        try {
            const data = await promises.readFile(this.path, "utf-8")
            const dataParseada = JSON.parse(data)

            
            if (!dataParseada[id - 1]) 
                {return "Ha ocurrido un error: no existe ese id"}

            return dataParseada[id - 1]
        }

        catch (err) {
            return { status: "error", error: err }
        }
    
    
    }

    addProduct = async (title, description, price, status,category, thumbnail, code, stock) => {
        try {

            this.products = await this.getProducts(); //Permite usar los productos del json

            const producto = {
                title,
                description,
                price,
                status,
                category,
                thumbnail,
                code,
                stock
            };

            const productCodeExists =  this.products.find(prod => prod.code === producto.code);
            const NotmissingValues = Object.values(producto).every(value => value);

            if (productCodeExists) { //Validación si el código del producto ya existe
                return {status: "error",
                        message:"Ha ocurrido un error: el producto ya ha sido agregado anteriormente"}
            }


            //Autoincremento del Id
            producto.id = (this.products.length === 0) ? 1 : this.products[this.products.length - 1].id + 1;


            if (NotmissingValues) { //Validación si los campos están completos
            
                if (producto.status === "false") { //Validación de que STATUS por defecto es TRUE
                    producto.status === false;
                } else {
                    producto.status = true;
                }
                producto.price = Number(producto.price); //Conversión a número
                producto.stock = Number(producto.stock); //Conversión a número
                product.thumbnail = [product.thumbnail]
                this.products.push(producto); // Agrega nuevo producto
                this.__appendProduct();
            }
            else if (producto.thumbnail === ''){
                if (producto.status === "false") { //Validación de que STATUS por defecto es TRUE
                    producto.status === false;
                } else {
                    producto.status = true;
                }
                producto.thumbnail = 'Sin imagen';
                producto.price = Number(producto.price); //Conversión a número
                producto.stock = Number(producto.stock); //Conversión a número
                product.thumbnail = [product.thumbnail]
                this.products.push(producto); // Agrega nuevo producto
                this.__appendProduct();
            }
            else {
                return {status: "error",
                        message:'Ha ocurrido un error: 2 o más campos no se completaron'}
            }

    
        } catch (err) {
            return { status: "error", error: err }
        }

    }



    deleteProduct = async (pid) =>  {

        try {

            const data = await promises.readFile(this.path, "utf-8")
            const dataParseadaObj = JSON.parse(data)
            const indexProducto = dataParseadaObj.findIndex(producto => producto.id == pid)
            
            if (isNaN(Number(pid))) return { status: "error", message: 'No es un id válido' };
            if (indexProducto !== -1) {
                dataParseadaObj.splice(indexProducto, 1)
                return { status: "success", message: `se eliminó el producto con id ${pid}` }
            }
            else {
                return {
                    status: "error",
                    message: 'Ha ocurrido un error: el producto con id ' + id + ' no existe'
                }
            }
            
        } catch (err) {
            return { status: "error", error: err }
        }

    }

    updateProduct = async (pid, changes) => {
        try {


            const data = await promises.readFile(this.path, "utf-8")
            const dataParseada = JSON.parse(data)
            const indexProducto = dataParseada.findIndex((producto) => producto.id == pid)

            
            if (indexProducto === -1) {

                return { status: "error", message: 'No se encontró el id' };
            
            }
            if (isNaN(Number(pid))) return { status: "error", message: 'No es un id válido' };




            dataParseada[indexProducto] = Object.assign(dataParseada[indexProducto], changes)

            this.__appendProduct()

            return {
                status: "success",
                message: "El producto con id ${id} ha sido modificado correctamente"
              }
    } catch (err) {
        return { status: "error", error: err }
    }


    }

}

/*
const producto3 = {
    id: 9,
    title: 'Producto 3',
    description: 'Este es el producto 3',
    price: 1000,
    thumbnail: "Sin imagen",
    code: "P-3",
    stock: 9
}
let administradorProductos = new ProductManager('./data.json')
let testing = async () => {
    console.log(await administradorProductos.getProducts())
   console.log(await administradorProductos.addProduct('Producto 1', 'Este es el producto 1', 200, "Sin imagen", "A123", 25))
    console.log(await administradorProductos.addProduct('Producto 2', 'Este es el producto 2', 333, "Sin imagen", "A1d23", 50))
   console.log(await administradorProductos.addProduct('Producto X', 'Este es el producto X', 653, 'Sin imagen', 'B456', 32))
    console.log(await administradorProductos.updateProduct(1, producto3)) 
   // console.log(await administradorProductos.deleteProduct(3))
   console.log(await administradorProductos.getProducts())
}
testing()
*/


module.exports = { ProductManager };
/*
let administradorProductos = new ProductManager('./src/DAO/products.json')
let testing = async () => {
    console.log(await administradorProductos.deleteProduct(1))
}
testing()*/