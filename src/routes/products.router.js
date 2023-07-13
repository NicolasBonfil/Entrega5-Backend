import { Router } from "express"

//import ProductManager from "../dao/fileManagers/products.js"
import ProductManager from "../dao/dbManagers/products.js"

const router = Router()

const manejadorProductos = new ProductManager()

router.get("/", async (req, res) => {
    
    let limite = req.query.limit
    const products = await manejadorProductos.getProducts(limite)

    res.send({status: "success", payload: products})
})

router.post("/", async (req, res) => {
    const {title, description, price, code, stock, category, thumbnail} = req.body

    let product = {
        title,
        description,
        price,
        code,
        stock,
        category,
        thumbnail
    }

    const newProduct = await manejadorProductos.addProduct(product)

    res.send(newProduct)
})

router.get("/:id", async (req, res) => {
    const id = req.params.id
    const product = await manejadorProductos.getProductById(id)

    res.send(product)
})

router.put("/:id", async (req, res) => {
    const id = req.params.id
    const datosActualizados = req.body

    const productoActualizado = await manejadorProductos.updateProduct(id, datosActualizados)

    res.send(productoActualizado)
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id

    const productoEliminado = await manejadorProductos.deleteProduct(id)

    res.send(productoEliminado)
})

export default router