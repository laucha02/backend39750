
import { Router } from "express";
import ProductManager from "../DAO/productManager.js";
import uploader from "../utils/multer.utils.js";



const router = Router();
const manager = new ProductManager();




router.get('/', async (req, res) => {

    try {
  
      const limit = req.query.limit
      const products = await manager.getProducts()

      res.status(200).send({products: products.slice(0, limit > products.length ? products.length : limit)})
  
  
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'error', message: 'Ha ocurrido un error en el router' })
    }
});

  router.get('/:pid', async (req, res) => {
    try {
  
      const pid = req.params.pid
      const product = await manager.getProductById(parseInt(pid))
      
      if (!product) {
  
        res.status(404).send({
          error: 'Ha ocurrido un error: el producto no ha sido encontrado.'
        })}
  
      res.status(200).send(product);
  
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 'error', message: 'Ha ocurrido un error en el router' })
    }
});



router.post('/', async (req, res) => {
    try {
        
        const productSend  = req.body

        
        const missingValues = Object.values(productSend).find(value => value === '')
        if (missingValues) {
            return res.status(400).send({ status: "error", message: "Ha ocurrido un error: 1 o más campos no se completaron" })
        }
        //destructuring
        const {
            title,
            description,
            price,
            status,
            thumbnail,
            code,
            stock
        } = productSend

        const addProductResponse  = await manager.addProduct(title, description, price, status, thumbnail, code, stock)

        if (addProductResponse .status === 'error') {
            return res.status(400).send({ addProductResponse  })
        }

        res.status(200).send({ productSend })


    }
    catch (err) {
        console.log(err);
        res.status(500).send({ status: 'error', message: 'Ha ocurrido un error en el router' })
    }
});



router.post('/formulario', uploader.single('thumbnail'), async (req, res) => {
    try {
        let productSend = req.body
        let {title,description,price,status,category,thumbnail,code,stock} = productSend


        try {
            productSend.thumbnail = req.file.path
        }
        catch {
            productSend.thumbnail = 'empty'
        }

        
        /*if (Object.hasOwn(productSend, 'status')) {
            productSend['status'] = 'true'
          } else {
            productSend['status'] = 'false'
          }
       */   
            

        const missingValues = Object.values(productSend).find(value => value === '')
        if (missingValues) {
            return res.status(400).send({ status: "error", message: "Ha ocurrido un error: 1 o más campos no se completaron" })
        }


        res.send(res.redirect("http://localhost:8080/static"))
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ status: 'error', message: 'Ha ocurrido un error en el router' })
    }
});



router.put('/:pid', async (req, res) => {
    try {
        

        const pid = req.params
        const productUpdate = req.body
        const updateProduct = await manager.updateProduct(pid, productUpdate)

        if (updateProduct.error) 
            {return res.status(400).send({  status: 'error', message: "Ha ocurrido un error al querer actualizar el producto" })}

        res.status(200).send({ status: 'success', message: 'El producto ha sido actualizado exitosamente', updateProduct })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ status: 'error', message: 'Ha ocurrido un error en el router' })
    }
});



router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const deleteResult  = await manager.deleteProduct(pid)
        if (deleteResult.error) {
            return res.status(400).send({ status: 'error', message: 'Ha ocurrido un error al querer eliminar el producto' })
        }
        res.status(200).send({ status: 'success', message: 'El producto ha sido eliminado exitosamente', deleteResult  })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ status: 'error', message: 'Ha ocurrido un error en el router' })
    }
});


export default router

