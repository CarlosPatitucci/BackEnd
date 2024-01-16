const fs = require("fs").promises;

class ProductManager {
    static ultId = 0;

    constructor(path) {
        this.productos = [];
        this.path = path;
    }

    codigoUnico(code) {
        return !this.productos.some(product => product.code === code);
    }

    async addProduct(nuevoProducto) {
        let { title, description, price, img, code, stock } = nuevoProducto;

        if (!title || !description || !price || !img || !code || !stock) {
            console.log('Error: Todos los campos son obligatorios. Asegúrate de proporcionar valores para cada campo.');
            return;
        }

        if (!this.codigoUnico(code)) {
            console.log(`Error: El código "${code}" ya está en uso. El código debe ser único.`);
            return;
        }

        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            img,
            code,
            stock
        }


        this.productos.push(newProduct);

        await this.guardarArchivo(this.productos);

    }

    getproductos() {
        console.log(this.productos);
    }

    async getProductById(id) {
        try {
            const arregloProductos = await this.leerArchivo();
            const productoBuscado = arregloProductos.find(item => item.id === id);

            if (!productoBuscado) {
                console.log("Producto no encontrado");
            } else {
                console.log("El producto buscado existe");
                return productoBuscado;
            }

        } catch (error) {
            console.log("Error al leer el archivo ", error);
        }

    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arregloProductos = JSON.parse(respuesta);
            return arregloProductos;

        } catch (error) {
            console.log("Error al leer un archivo", error);
        }
    }

    async guardarArchivo(arregloProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arregloProductos, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo", error);
        }
    }

    async updateProduct(id, productoActualizado) {
        try {
            const arregloProductos = await this.leerArchivo();

            const index = arregloProductos.findIndex(item => item.id === id);

            if (index !== -1) {
                arregloProductos.splice(index, 1, productoActualizado);
                await this.guardarArchivo(arregloProductos);
            } else {
                console.log("no se encontró el producto");
            }

        } catch (error) {
            console.log("Error al actualizar el producto", error);
        }
    }
    async deleteProduct(id) {
        try {
            const arregloProductos = await this.leerArchivo();

            const index = arregloProductos.findIndex(item => item.id === id);

            if (index !== -1) {
                arregloProductos.splice(index, 1);
                await this.guardarArchivo(arregloProductos);
                console.log("Producto eliminado exitosamente.");
            } else {
                console.log("No se encontró el producto con el ID proporcionado.");
            }
        } catch (error) {
            console.log("Error al eliminar el producto", error);
        }
    }

}


const manager = new ProductManager("./productos.json");

manager.getproductos();


const zanahoria = {
    title: "Zanahoria",
    description: "vegetal naranja",
    price: 100,
    img: "imagen 1",
    code: "COD01",
    stock: 50
}


manager.addProduct(zanahoria);


const manzana = {
    title: "Manzana",
    description: "fruta roja y jugosa",
    price: 250,
    img: "imagen 2",
    code: "COD02",
    stock: 100
}


manager.addProduct(manzana);

const banana = {
    title: "Banana",
    description: "fruta amarilla y nutritiva",
    price: 350,
    img: "imagen 3",
    code: "COD03",
    stock: 30
}

manager.addProduct(banana);

const tomate = {
    title: "Tomate",
    description: "vegetal rojo",
    price: 250,
    img: "imagen 5",
    code: "COD03",
    stock: 230
}

manager.addProduct(tomate);

const cebolla = {
    title: "Cebolla",
    description: "vegetal que al pelarlo puede hacerte llorar",
    price: 450,
    img: "imagen 6",
    code: "COD05",
    stock: 330
}

manager.addProduct(cebolla);

manager.getproductos();


async function busquedaPorId() {
    const productoBuscado = await manager.getProductById(2);
    console.log(productoBuscado);
}

busquedaPorId();

async function eliminarProducto() {
    await manager.deleteProduct(4); 
    manager.getproductos();
}

const lechuga = {
    id: 1,
    title: "lechuga", 
    description: "vegetal verde", 
    price: 150,
    img: "imagen 4",
    code: "COD04",
    stock: 130
};

async function funcionActualizar() {
    await manager.updateProduct(1, lechuga);
}

async function iniciar() {
    await eliminarProducto();
    await funcionActualizar();
}

iniciar();
