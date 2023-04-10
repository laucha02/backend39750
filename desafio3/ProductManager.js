const mock = require ('./mock')
const fs = require('fs')
const promises = fs.promises

class ProductManager {
    constructor(products = []) {
      this.path = './data.json';
      this.products = products
//      this.#crearArchivo()
    }
    async #crearArchivo() {


           // await promises.access(this.path, fs.constants.F_OK); //Verifica si archivo existe

           // await promises.writeFile(this.path, "[]", "utf-8"); // Si no existe, se crea con writeFile
        
        
        try {
            const fetchData = await promises.readFile(this.path, "utf-8")
            if (fetchData.length === 0) { //Verifica si archivo está vacío
                await promises.writeFile(this.path, "[]", "utf-8") //Si lo está, sobreescribe el array vacío
        }} catch (err) {
            console.error("Ha ocurrido un error al leer el archivo:", err);
        }
            
            
        
    }



    async getProducts() {
        try {

            const data = await promises.readFile(this.path, "utf-8")
            const products = JSON.parse(data);
            console.log("Productos obtenidos con éxito:");
            return products

        } catch (err) {

            console.log('Ha ocurrido un error: no se pudo obtener el archivo', err);

        }
    }

   
    

    async getProductById(id) {

        try {
            const data = await promises.readFile(this.path, "utf-8")
            const dataParseada = JSON.parse(data)
            const seEncontroProducto = dataParseada.find(value => value.id === id)

            if (!seEncontroProducto[id - 1]) 
                {return "Ha ocurrido un error: no existe ese id"}

            return seEncontroProducto[id - 1]
        }        

        catch (err) {

            console.log('Ha ocurrido un error: no se pudo obtener el archivo', err);

        }
    
    
    }

    async addProduct(title, description, price, thumbnail, code, stock) {

        try {

            const producto = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };

            const productCodeExists =  this.products.find(prod => prod.code === producto.code);
            const missingValues = !Object.values(producto).every(value => value);

            if (productCodeExists) {
                return console.log('Ha ocurrido un error: el producto ya ha sido agregado anteriormente')
            }

            if (missingValues) {
                return console.log('Ha ocurrido un error: 1 o más campos no se completaron')
            }

            producto.id = (this.products.length === 0) ? 1 : this.products[this.products.length - 1].id + 1;
            
            this.products.push(producto)
            let dataToString = JSON.stringify(this.products, "null", 2)
            await promises.writeFile(this.path, dataToString, "utf-8")
            console.log('El producto ha sido ingresado');
            
        } catch (err) {
            
            console.log('Ha ocurrido un error: no se pudo obtener el archivo', err);

        }

    }



    async deleteProduct(id) {

        try {

            const data = await promises.readFile(this.path, "utf-8")
            const dataParseadaObj = JSON.parse(data)
            const indexProducto = dataParseadaObj.findIndex((producto) => producto.id == id)

            if (indexProducto !== -1) {

                dataParseadaObj.splice(indexProducto, 1)
                let objAJSON = JSON.stringify(dataParseadaObj, "null", 2)
                await promises.writeFile(this.path, objAJSON)
                console.log('El producto con id ',id,' ha sido eliminado correctamente');
            }
            else {
                console.log('Ha ocurrido un error: el producto con id ',id,' no existe');
            }
        } catch (err) {

            console.log('Ha ocurrido un error: no se pudo obtener el archivo', err);

        }

    }

    async updateProduct(id, changes) {
        try {


            const data = await promises.readFile(this.path, "utf-8")
            const dataParseada = JSON.parse(data)
            const indexProducto = dataParseada.findIndex((producto) => producto.id == id)

            
            if (indexProducto === -1) {

                return console.log('El producto con id ',id,' no se ha encontrado')
            
            }



            dataParseada[indexProducto] = Object.assign(dataParseada[indexProducto], changes)

            const ObjToString = JSON.stringify(dataParseada, "null", 2)
            await promises.writeFile(this.path, ObjToString, "utf-8")

            return console.log('El producto con id ',id,' ha sido modificado correctamente');
        } catch (err) {

            console.log('Ha ocurrido un error: no se pudo obtener el archivo', err);

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


module.exports = ProductManager
/*
let administradorProductos = new ProductManager('./data.json')
let testing = async () => {
    console.log(await administradorProductos.getProductById(1))
}
testing()*/