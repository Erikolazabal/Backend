import { productModel } from "../../models/products.model.js"

export default class ProductManager {

    //Traer todos los productos
    async getProducts(limit, userQuery, sort, page){
        try {
            const options = {
                limit: limit,
                page: page,
                sort: sort ? {price: sort} : {},
                lean: true
            }
            const products = await productModel.paginate(userQuery, options)
            const productsResponse = {
                status: "success",
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: products.prevPage ? `http://localhost:3000/api/products?page=${products.prevPage}` : null,
                nextLink: products.nextPage ? `http://localhost:3000/api/products?page=${products.nextPage}` : null,
            }
            return productsResponse
        } catch (error) {
            const errorResponse = {
                status: "error",
                description: `${error}`
            }
            return errorResponse
        }
    }

    //Traer producto por ID
    async getProductById(productId){
        try {
            const product = await productModel.findById(productId).lean(true)
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
    
    //Actualizar porducto por ID
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