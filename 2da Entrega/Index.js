const fs = require("fs");
const path = "./Info.json";

class ManagerUsuarios {
  constructor() {
    this.path = [];
  }

  async getProducts() {
    try {
      if (fs.existsSync(path)) {
        const usuarios = await fs.promises.readFile(path, "utf-8");
        const usuarioJSON = JSON.parse(usuarios);
        return usuarioJSON;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
    return this.path;
  }

  async addProduct(products) {
    try {
      const { title, description, price, thumbnail, code, stock } = products;
      const product = {
        id: this.#generarId(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      const productFile = await this.getProducts();
      productFile.push(product);
      this.path.push(product);
      await fs.promises.writeFile(path, JSON.stringify(productFile));
    } catch (error) {
      console.log(error);
    }
  }

  deletFileProducts(parametro) {
    if (parametro === "si") {
      fs.unlinkSync(path);
    }
  }

  getProductById(id) {
    return (
      this.path.find((propiedad) => propiedad.id === id) || `ERROR : Not found , El producto con el id ${id} no existe`
    );
  }
    
  updateProduct(id, title){
        const update = this.path.find(prop => prop.id === id)
        return update.title = title
    }

  deleteProduct(id) {
    return this.path.filter((elemente) => elemente.id !== id);
  }

  #generarId() {
    const count = this.path.length;
    const crearId = count > 0 ? this.path[count - 1].id + 1 : 1;
    return crearId;
  }
}

/* Productos */

const manager = new ManagerUsuarios();

const producto1 = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: 1234,
  stock: 25,
};
const producto2 = {
  title: "producto prueba 2",
  description: "Este es un producto prueba 2",
  price: 300,
  thumbnail: "Sin imagen",
  code: 5678,
  stock: 25,
};
const producto3 = {
  title: "producto prueba 3",
  description: "Este es un producto prueba 3",
  price: 400,
  thumbnail: "Sin imagen",
  code: 1234,
  stock: 25,
};

/* Console.logs */

async function prueba() {
  console.log(await manager.getProducts());
  await manager.addProduct(producto1);
  await manager.addProduct(producto2);
  await manager.addProduct(producto3);

  console.log(manager.getProductById(20));  // Obterner producto con el id : 20 (ERROR)

  console.log('NewTittle',manager.updateProduct(1, 'Update product 1'))   // actualizamos un producto

  console.log(manager.deleteProduct(3));  //eliminamos el archivo .json  // manager.deletFileProducts('si')
  
}

prueba();
