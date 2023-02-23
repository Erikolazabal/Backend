import { productModel } from "../../models/products.model.js"

export default class ProductManager {

    //Traer todos los productos
    async getProducts(){
        try {
            const products = await productModel.find()
            return products
        } catch (error) {
            return error
        }
    }

    //Traer producto por ID
    async getProductById(productId){
        try {
            const product = await productModel.findById(productId)
            return product
        } catch (error) {
            return error
        }
    }

    //Añadir producto
    async addProduct(product){
        try {
            await productModel.create(product)
            return "Producto creado con exito"
        } catch (error) {
            return error
        }
    }
    
    //Actualizar producto por Id
    async updateProduct(productId, updatedFields){
        try {
            await productModel.updateOne({_id: productId},
                {
                    $set: {
                        ...updatedFields
                    }
                }
            )
            return `Producto con el ID ${productId} actualizado con exito`
        } catch (error) {
            return error
        }
    }

    //Eliminar producto por ID
    async deleteProduct(productId){
        try {
            await productModel.deleteOne({_id: productId})
            return `Producto con el ID ${productId} eliminado con exito`
        } catch (error) {
            return error
        }
    }
}