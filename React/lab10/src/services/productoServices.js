// api.js
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/';

export const listarProductosPorCategoria = async (categoriaId) => {
    try {
      const response = await axios.get(`${BASE_URL}productos/categoria/${categoriaId}/`);
      console.log('Lista de productos por categoría obtenida con éxito:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al obtener la lista de productos por categoría:', error);
      throw error;
    }
  };
  

export const insertarProducto = async (newProduct, setProductos) => {
  try {
    const response = await axios.post(`${BASE_URL}producto`, newProduct);
    console.log('Producto insertado con éxito:', response.data);
    setProductos((prevProductos) => [...prevProductos, response.data]);
    return response.data;
  } catch (error) {
    console.error('Error al insertar el producto:', error);
    throw error;
  }
};

export const eliminarProducto = async (id, setProductos) => {
  try {
    const response = await axios.delete(`${BASE_URL}producto/${id}`);
    if (response.status === 204) {
      console.log('Producto eliminado con éxito');
      setProductos((prevProductos) => prevProductos.filter((producto) => producto.id !== id));
    } else {
      console.error('Error al eliminar el producto:', response.status);
    }
  } catch (error) {
    console.error('Error al realizar la petición de eliminación:', error);
    throw error;
  }
};

export const actualizarProducto = async (id, newProduct, setProductos) => {
  try {
    const response = await axios.put(`${BASE_URL}producto/${id}`, newProduct);
    console.log('Producto actualizado con éxito:', response.data);
    setProductos((prevProductos) =>
      prevProductos.map((producto) => (producto.id === id ? response.data : producto))
    );
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    throw error;
  }
};
