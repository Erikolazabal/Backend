class ProductManager {
    #products
    constructor() {
        this.#products = [];
        this.idEvento = 1;
    }

    verificarProduct(product) {
        let verificacion = false;
        this.#products.forEach((producto) => {
            producto.code === product.code && (verificacion = true);
        });
        if (!verificacion) {
            if (
                product.title !== "" &&
                product.description !== "" &&
                product.price !== "" &&
                product.thumbnail !== "" &&
                product.code !== "" &&
                product.stock !== ""
            ) {
                return true;
            } else {
                return `Falta algun campo`;
            }
        } else {
            return `El codigo es el mismo que otro producto.`;
        }
    }

    addProduct(product) {
        const validacion = this.verificarProduct(product)
        if (validacion === true) {
            product.crearId(this.idEvento);
            this.idEvento += 1;
            this.#products.push(product);
            return `Carga de producto exitosa.`
        } else {
            return validacion
        }
    }

    getProducts() {
        return this.#products
    }

    getProductById(id) {
        return (this.#products.find(product => product.id === id)) || 'ERROR : Not found'
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }

    crearId(id) {
        this.id = id;
    }
}

/* Productos */

const producto1 = new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", 1234, 25);

const producto2 = new Product("producto prueba2", "Este es un producto prueba2", 300, "Sin imagen", 5678, 20);

const producto3 = new Product("producto prueba3", "Este es un producto prueba3", 400, "Sin imagen", 1234, 15);

const AllProductos = new ProductManager();

/* Console.logs */

console.log(AllProductos.addProduct(producto1)) //cargar primer producto 

console.log(AllProductos.addProduct(producto2)) //cargar segundo producto 

console.log(AllProductos.addProduct(producto3)) //cargar tercer producto, con code igual a 1mer producto

console.log(AllProductos.getProducts()) // Obterner productos

console.log(AllProductos.getProductById(2)) // Obterner producto con el id : 2

console.log(AllProductos.getProductById(20)) // Obterner producto con el id : 20 (ERROR)