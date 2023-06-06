import supertest from "supertest";
import { expect } from "chai";
import envConfig from "../src/config/envConfig.js";
import NewCartDTO from "../src/dto/CartsDTO/newCart.dto.js";
import SessionDTO from "../src/dto/UsersDTO/session.dto.js";

const requester = supertest('http://localhost:3000');

// Carrito de usuario de prueba
const testCart = "646fb8dfc8a11e0d8eeb1858";
// ID del producto de prueba
const testProduct = "6470338e24ae8edea22c496f";

// ID del producto que se crea en las pruebas
let testProductGenerated;

// Contraseña para permisos de administrador
const password = envConfig.adminPassword;

//Producto para probar
const productMock = {
    title: "Producto de Test",
    description: "Este es un ejemplo de producto test",
    price: 100,
    stock: 10,
    code: "PROD003",
    category: "Test",
    thumbnail: "https://w7.pngwing.com/pngs/918/14/png-transparent-brown-box-cardboard-box-corrugated-box-design-carton-closed-cardboard-box-miscellaneous-cardboard-gift-box-thumbnail.png",
    status: true,
  };
  
  const productUpdatedMock = {
    description: "Producto actualizado test1",
    price: 210,
  };

describe('API de productos de prueba (/api/products)', function() {
    it('crear un producto', async () => {
      const body = {
        password: password,
        product: productMock
      };
      const result = await requester.post('/api/products').send(body);
      expect(result.body).to.have.property('_id');
      expect(result.body).to.have.property('owner');
      testProductGenerated = result.body._id;
    });

    it('Obtener todos los productos', async () => {
        const result = await requester.get('/api/products')
        expect(result._body).to.have.property('status')
        expect(result._body).to.have.property('payload')
        expect(result._body.status).to.be.equal('success')
        expect(result._body.payload).to.be.an('array')
        expect(result._body.payload).to.not.have.lengthOf(0)
    })

    it('Actualizar un producto', async () => {
        const body = {
            password: password,
            product: productUpdatedMock
        }
        const result = await requester.put(`/api/products/${testProductGenerated}`).send(body)
        expect(result._body).to.have.property('acknowledged')
        expect(result._body).to.have.property('modifiedCount')
        expect(result._body).to.have.property('matchedCount')
        expect(result._body.matchedCount).to.not.be.equal(0)
    })

    it('Obtener producto por ID', async () => {
        const result = await requester.get(`/api/products/${testProductGenerated}`)
        expect(result._body).to.have.property('_id')
    })

    it('Eliminar un producto', async () => {
        const body = {
            password: password
        }
        const result = await requester.delete(`/api/products/${testProductGenerated}`).send(body)
        expect(result._body).to.have.property('deletedCount')
        expect(result._body).to.have.property('acknowledged')
        expect(result._body.deletedCount).to.be.equal(1)
    })
})

describe('API de carros de prueba (/api/carts)', function() {
    it('Cart DTO', () => {
      const newCart = new NewCartDTO();
      expect(newCart).to.have.property('products');
      expect(newCart.products).to.be.an('array');
      expect(newCart.products).to.have.lengthOf(0);
    });

    it('Crear carrito', async () => {
        const body = {
            password: password
        }
        const result = await requester.post('/api/carts').send(body)
        expect(result._body).to.have.property('_id')
        expect(result._body).to.have.property('products')
        expect(result._body.products).to.be.an('array')
        expect(result._body.products).to.have.lengthOf(0)
    })

    it('Añadir producto al carrito ', async () => {
        const body = {
            password: password
        }
        const result = await requester.post(`/api/carts/${testCart}/product/${testProduct}`).send(body)
        expect(result._body).to.have.property('matchedCount')
        expect(result._body).to.have.property('modifiedCount')
        expect(result._body.matchedCount).to.be.equal(1)
        expect(result._body.modifiedCount).to.be.equal(1)
    })

    it('Carro vacio', async () => {
        const body = {
            password: password
        }
        await requester.delete(`/api/carts/${testCart}`).send(body)
        const result = await requester.get(`/api/carts/${testCart}`)
        expect(result._body).to.have.property('_id')
        expect(result._body).to.have.property('products')
        expect(result._body.products).to.be.an('array')
        expect(result._body.products).to.have.lengthOf(0)
    })
})

    describe('API de sesiones de prueba (/api/sessions)', function() {
        const fakeSession = {
        cookie: {
            path: '/',
            _expires: null,
            originalMaxAge: null,
            httpOnly: true
        },
        passport: {
            user: '7l1Q2xi88C9Nzw8P1FlKZJVr'
        },
        user: {
            tickets: [],
            _id: "646fb8dfc8a11e0d8eeb185a",
            first_name: "Test",
            last_name: "admin",
            email: "test@admin.com",
            password: "ifygSgwVLurTbufqp0g9E.TEuCdbLWSRDP",
            age: 19,
            cart: "646fb8dfc8a11e0d8eeb18",
            role: "user",
            __v: 0,
        }
        };

    it('Session DTO', async () => {
        const session = new SessionDTO(fakeSession);
        expect(session).to.have.property('full_name');
        expect(session).to.have.property('email');
        expect(session).to.have.property('cart');
        expect(session).to.have.property('role');
        expect(session).to.have.property('age');
        expect(session).to.not.have.property('tickets');
        expect(session).to.not.have.property('_id');
        expect(session).to.not.have.property('password');
        expect(session).to.not.have.property('__v');
        expect(session.full_name).to.be.equal(`${fakeSession.user.first_name} ${fakeSession.user.last_name}`);
    });
})