import fs from "fs"

const path = "./products.json"

export default class ProductManager{
    getProducts = (limite) => {
        if(fs.existsSync(path)){
            const data = fs.readFileSync(path, "utf-8")
            if(!limite || limite >= JSON.parse(data).length) return JSON.parse(data)

            let productosConLimite = (JSON.parse(data).slice(0, limite))
            return productosConLimite;

        }else{
            return []
        }
    }

    getProductById = async (id) => {
        const products = await this.getProducts()

        if(!(products.find(p => p.id == id))) return ({error: "No existe un producto con ese id"})
        return(products.find(p => p.id == id))
    }

    addProduct = async (product) =>{
        const products = await this.getProducts()

        if(products.length === 0){
            product.id = 1
        }else{
            product.id = products[products.length - 1].id + 1
        }

        product.status = true

        if(!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category){
            return({error: "Faltan datos"})
        }

        const productoAgregado = products.find(p => p.code === product.code)

        if(productoAgregado){
            return ({error: "El producto ya esta registrado"})
        }

        products.push(product)

        fs.writeFileSync(path, JSON.stringify(products))

        return {status: "Ok", message: "Producto Agregado"}
    }

    updateProduct = async (id, datosActualizados) => {
        const products = await this.getProducts()
        let product = products.find(p => p.id == id)

        const keys = Object.keys(datosActualizados)
        const values = Object.values(datosActualizados)

        if(!(products.find(p => p.id == id))){
            return ({error: "No existe un producto con ese id"})
        }

        if(keys.includes("id")){
            const indice = keys.indexOf("id")
            keys.splice(indice, 1)
            values.splice(indice, 1)
        }

        if(keys.values("code")){
            const indice = keys.indexOf("code")
        
            const productoAgregado = products.find(p => p.code === values[indice])

            if(productoAgregado){
                return ({error: "Ya hay un producto con ese codigo"})
            }
        }

        for(let i = 0; i < keys.length; i++){
            product[keys[i]] = values[i] 
        }

        fs.writeFileSync(path, JSON.stringify(products))
        
        return({status: "Ok", message: "Producto actualizado"})
    }

    deleteProduct = async (id) => {
        const products = await this.getProducts()

        if(!(products.find(p => p.id == id))){
            return ({error: "No existe un producto con ese id"})
        }
    
        const indice = products.findIndex(p => p.id == id)
    
        products.splice(indice, 1)

        if(products.length === 0){
            fs.unlinkSync(path)
        }else{
            fs.writeFileSync(path, JSON.stringify(products))
        }

    
        return({status: "Ok", message: "Producto eliminado"})
    }
}