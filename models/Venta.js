const mongoose = require('mongoose');

const detalleProductoSchema = new mongoose.Schema({
  productoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true
  },
  cantidadVendida: {
    type: Number,
    required: [true, 'La cantidad vendida es obligatoria'],
    min: [1, 'Debe venderse al menos 1 unidad']
  },
  precioVenta: {
    type: Number,
    required: [true, 'El precio de venta es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  subtotal: {
    type: Number,
    required: true,
    min: [0, 'El subtotal no puede ser negativo']
  }
}, { _id: false });

const ventaSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
    min: [0, 'El total no puede ser negativo']
  },
  iva: {
    type: Number,
    required: true,
    min: [0, 'El IVA no puede ser negativo']
  },
  productos: {
    type: [detalleProductoSchema],
    required: true,
    validate: [arr => arr.length > 0, 'Debe haber al menos un producto']
  }
}, { versionKey: false });

module.exports = mongoose.model('Venta', ventaSchema);
