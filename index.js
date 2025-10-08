const mongoose = require('mongoose');
const productoDAO = require('./dao/ProductoDAO');
const ventaDAO = require('./dao/VentaDAO');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/tienda');

    const producto = await productoDAO.crearProducto({
      nombre: 'Laptop',
      precio: 15000,
      cantidad: 30000
    });

    const venta1 = await ventaDAO.crearVenta({
      total: 30000,
      iva: 4800,
      productos: [{
        productoId: producto._id,
        cantidadVendida: 2,
        precioVenta: 15000,
        subtotal: 30000
      }]
    });

    const venta2 = await ventaDAO.crearVenta({
      total: 45000,
      iva: 7200,
      productos: [{
        productoId: producto._id,
        cantidadVendida: 3,
        precioVenta: 15000,
        subtotal: 45000
      }]
    });

    console.log('Ventas registradas:', venta1, venta2);

    const productos = await productoDAO.obtenerProductos();
    console.log(productos);

    const ventas = await ventaDAO.obtenerVentas();
    console.log(ventas);

    const productoActualizado = await productoDAO.actualizarProducto(producto._id, {
      precio: 16000
    });
    console.log(productoActualizado);

    const ventaEliminada = await ventaDAO.eliminarVenta(venta1._id);
    console.log(ventaEliminada);

  } catch (error) {
    console.error(error.message);
  } finally {
    mongoose.connection.close();
  }
})();
