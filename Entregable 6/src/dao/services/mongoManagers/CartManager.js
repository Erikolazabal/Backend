import { cartModel } from "../../models/carts.model.js"

export default class CartManager {

    //Traer carrito
    async getCarts(){
        try {
            const carts = await cartModel.find()
            return carts
        } catch (error) {
            return `Se ha producido un error: ${error}`
        }
    }

    //Traer carrito por ID
    async getCartById(cartId){
        try {
            const cart = await cartModel.findOne({_id: cartId}).lean()
            return cart
        } catch (error) {
            return `Se ha producido un error: ${error}`
        }
    }

    //Crear carrito
    async createCart(){
        try {
            const newCart = {products: []}
            const cart = await cartModel.create(newCart)
            return cart
        } catch (error) {
            return `Se ha producido un error: ${error}`
        }
    }

    //Agregar múltiples productos al carrito
    async addProductsToCart(cartId, newProducts){
        try {
            const cart = await this.getCartById(cartId)
            if(cart) {
                const updatedCart = await cartModel.updateOne(
                    {_id: cartId},
                    {
                        $addToSet: {
                            products: {
                                $each: [...newProducts]
                            }
                        }
                    }
                )
                .then(() => {
                    return `Los productos: ${newProducts} se agregaron al carrito con ID ${cartId}`
                })
                .catch((error) => {
                    return `Se produjo un error: ${error}`
                })
                return updatedCart
            } else {
                return `No existe un carrito con el ID ${cartId}`
            }
        } catch (error) {
            return `Se ha producido un error: ${error}`
        }
    }

    //Actualizar la cantidad de un productos que está en un carrito
    async updateProductInCartQuantity (cartId, prodId, quantity){
        console.log(cartId, prodId, quantity);
        try {
            const cart = await this.getCartById(cartId)
            if(cart) {
                const updatedCart = await cartModel.updateOne(
                    {_id: cartId, 'products._id': prodId},
                    {
                        $set: {
                            'products.$.quantity': quantity
                        }
                    },
                    {
                        new: true
                    }
                )
                .then(() => {
                    return `Cantidad del producto con ID ${prodId} actualizada a ${quantity} en el carrito con ID ${cartId}`
                }
                )
                .catch((error) => {
                    return `Se ha producido un error: ${error}`
                })
                return updatedCart
            } else {
                return `No existe un carrito con el ID ${cartId}`
            }
        } catch (error) {
            return `Se ha producido un error: ${error}`
        }
    }

    //Agregar producto a un carrito
    async addProductInCart(cartId, prodId){
        try {
            const cart = await this.getCartById(cartId)
            if(cart) {
                let result = await cartModel.findOne(
                    {_id: cartId, 'products._id':prodId}
                )
                if (result === null){
                    await cartModel.updateOne(
                        {_id: cartId},
                        {
                            $push: {
                                products: {
                                    _id: prodId,
                                    quantity: 1,
                                }
                            }
                        },
                        {
                            new: true
                        }
                    )
                    return `Agregado el producto con ID ${prodId} al carrito con ID ${cartId}`
                } else {
                    await cartModel.updateOne(
                        {_id: cartId, 'products._id':prodId},
                        {
                            $inc: {
                                'products.$.quantity': 1
                            }
                        },
                        {
                            new: true
                        }
                    )
                    return `Aumentada en 1 la cantidad de producto con ID ${prodId} en el carrito con ID ${cartId}`
                }  
            } else {
                return `Carrito con el ID ${cartId} no existente`
            }
        } catch (error) {
            return `Se ha producido un error: ${error}`
        }
    }

    //Eliminar producto dentro de un carrito
    async deleteProdInCart(cartId, prodId) {
        try {
            const cart = await this.getCartById(cartId)
            if(cart) {
                const updatedCart = await cartModel.updateOne(
                    {_id: cartId},
                    {
                        $pull: {
                            products: {
                                _id: prodId
                            }
                        }
                    }
                )
                .then(() => {
                    return `El producto con el ID ${prodId} ha sido eliminado del carrito con el ID ${cartId}`
                })
                .catch((error) => {
                    return `Se ha producido un error: ${error}`
                })
                return updatedCart
            } else {
                return `Carrito con el ID ${cartId} no existente`
            }
        } catch (error) {
            return `Se ha producido un error: ${error}`
        }
    }

    //Vaciar carrito
    async deleteAllProductsInCart(cartId){
        try {
            const cart = await this.getCartById(cartId)
            if(cart) {
                const updatedCart = await cartModel.updateOne(
                    {_id: cartId},
                    {
                        $set: {
                            products: []
                        }
                    }
                )
                .then(() => {
                    return `El carrito con el ID ${cartId} ha sido vaciado`
                })
                .catch((error) => {
                    return `Se ha producido un error: ${error}`
                })
                return updatedCart
            } else {
                return `Carrito con el ID ${cartId} no existente`
            }
        } catch (error) {
            return `Se ha producido un error: ${error}`
        }
    }
}