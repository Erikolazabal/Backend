import { existsSync, promises } from 'fs';

//Clase
export default class ProductManager {  
    constructor() {
        this.path = "./files/Products.json";
    }

    async getProducts() {
        try {
            if (existsSync(this.path)) {
                const products = await promises.readFile(this.path, 'utf-8');
                const productsParse = JSON.parse(products);
                return productsParse;
            } else {
                return [];
            }
        } catch (error) {
            console.log("Error: No se encontro producto");
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        let newProduct;
        let array = await this.getProducts();
        const codeProduct = array.find(prod => prod.code === code)

        if (!title || !description || !price || !thumbnail || !code || !stock) {
        } else if (codeProduct){
            console.log("Error: el código ya existe");
        } else {
            newProduct = {
                id: await this.generateId(),
                title, 
                description,
                price,
                thumbnail,
                code,
                stock
            }
        }

        try {
            const productsFile = await this.getProducts();
            productsFile.push(newProduct);
            await promises.writeFile(this.path, JSON.stringify(productsFile));
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(idProduct) {
        
        const array = await this.getProducts();
        const newArray = array.find(product => product.id === idProduct);
        
        if (newArray) {
            return newArray;
        } 
        
        return console.log("ERROR : Not found , El producto con el id no existe");
    }

    async generateId() {
        let id = 1;

        try {
            let idProduct = await this.getProducts();

            if (idProduct.length !== 0) {
                id = idProduct[idProduct.length - 1].id + 1;
            }
        } catch (error) {
            console.log("Error: No se pudo generar Id");
        }
        
        return id;
    }

    async updateProduct(idProduct, field) {
        let array = await this.getProducts();
        let object = array.find(product => product.id === idProduct);
        
        object = {
            id: idProduct,
            ...field
        }
        
        const newArray = array[idProduct - 1] = object;
        console.log(newArray);

        try {
            await promises.writeFile(this.path, JSON.stringify(array));
        } catch (error) {
            console.log("Error: No se pudo actualizar producto");
        }   
    }

    async deleteProduct(idProduct) {
        let array = await this.getProducts();
    
        try {
            const newArray = array.filter(elem => elem.id !== idProduct);
            await promises.writeFile(this.path, JSON.stringify(newArray));
        } catch (error) {
            console.log("error");
        }
    }
}

//Instancia
const product = new ProductManager();

const producto2 = {
    title: "producto prueba 3",
    description: "Este es un producto prueba 3",
    price: 400,
    thumbnail: "Sin imagen",
    code: 1234,
    stock: 25,
};

//prueba
async function Prueba() {
    console.log("TODOS LOS PRODUCTOS");
    const todosprod = await product.getProducts();
    console.log(todosprod);

    console.log("PRODUTO POR ID");
    const getId = await product.getProductById(2);
    console.log(getId);
    
    console.log("PRODUCTO ACTUALIZADO");
    const update = await product.updateProduct(1, {
                                    title:"producto actualizado", 
                                    description:"Este es un producto prueba", 
                                    price:200, 
                                    thumbnail:"Sin imágen", 
                                    code:"abc123", 
                                    stock:30
                                }) 
    console.log(update);
    
    console.log("Producto eliminado por id (3)");
    await product.deleteProduct(3);
    console.log(todosprod); 
}

Prueba(); 

