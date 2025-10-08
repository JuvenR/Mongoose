const Producto = require('../models/Producto');

class ProductoDAO {
  async crearProducto(data) {
    return await Producto.create(data);
  }

  async obtenerProductos() {
    return await Producto.find();
  }

  async obtenerProductoPorId(id) {
    return await Producto.findById(id);
  }

  async actualizarProducto(id, data) {
    return await Producto.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async eliminarProducto(id) {
    return await Producto.findByIdAndDelete(id);
  }
}

module.exports = new ProductoDAO();
