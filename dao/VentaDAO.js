const Venta = require('../models/Venta');

class VentaDAO {
  async crearVenta(data) {
    return await Venta.create(data);
  }

  async obtenerVentas() {
    return await Venta.find().populate('productos.productoId', 'nombre precio');
  }

  async obtenerVentaPorId(id) {
    return await Venta.findById(id).populate('productos.productoId', 'nombre precio');
  }

  async actualizarVenta(id, data) {
    return await Venta.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async eliminarVenta(id) {
    return await Venta.findByIdAndDelete(id);
  }
}

module.exports = new VentaDAO();
