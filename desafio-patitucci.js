class ProductManager {
    #id = 1;

    constructor() {
        this.productos = [];
    }

    getProducts() {
        return this.productos;
    }

    codigoUnico(code) {
        return !this.productos.some(product => product.code === code);
    }

    addProducts(title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Error: Todos los campos son obligatorios. Asegúrate de proporcionar valores para cada campo.');
            return;
        }

        if (!this.codigoUnico(code)) {
            console.log(`Error: El código "${code}" ya está en uso. El código debe ser único.`);
            return;
        }

        let product = {};
        product.title = title;
        product.description = description;
        product.price = price;
        product.thumbnail = thumbnail;
        product.code = code;
        product.stock = stock;
        product.id = this.#id++;
        this.productos.push(product);
    }

    getProductById(id) {
        const product = this.productos.find(product => product.id === id);
        return product || null;
    }
}

const productosCreados = new ProductManager();
productosCreados.addProducts('Zanahoria', 'vegetal naranja', 100, 'https://img.freepik.com/vector-premium/icono-ilustracion-dibujos-animados-vector-vegetal-zanahoria-fresca_472998-308.jpg?w=2000', 'COD01', 1010);
productosCreados.addProducts('Manzana', 'fruta roja y jugosa', 250, 'https://img.freepik.com/vector-gratis/ilustracion-icono-dibujos-animados-fruta-manzana-concepto-icono-fruta-alimentos-aislado-estilo-dibujos-animados-plana_138676-2922.jpg?size=338&ext=jpg&ga=GA1.1.1687694167.1704153600&semt=ais', 'COD03', 510);
productosCreados.addProducts('Banana', 'fruta amarilla y nutritiva', 350, 'https://static.vecteezy.com/system/resources/previews/024/734/340/non_2x/cartoon-illustration-of-two-bananas-vector.jpg', 'COD05', 310);
productosCreados.addProducts('Lechuga', 'vegetal verde', 150, 'https://img.freepik.com/vector-premium/ilustracion-icono-vector-dibujos-animados-lechuga-mostaza-verde-flotante_480044-617.jpg', 'COD05', 440);
productosCreados.addProducts('Tomate', 'ideal para una ensalada', 250, '', 'COD07', 540);

console.log(productosCreados.getProducts());

const productIdBuscar = 3;
const buscarProducto = productosCreados.getProductById(productIdBuscar);

if (buscarProducto) {
    console.log(`Producto encontrado: ${buscarProducto.title} - Precio: $${buscarProducto.price}`);
} else {
    console.log(`Producto con ID ${productIdBuscar} no encontrado.`);
}


//Agregue la cantidad de productos necesarias para ejemplificar cada caso.