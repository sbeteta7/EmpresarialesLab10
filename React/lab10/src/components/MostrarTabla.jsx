import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import { eliminarProducto, actualizarProducto, insertarProducto } from "../services/productoServices";

import categoriaServices from "../services/categoriaServices";
import { listarProductosPorCategoria } from "../services/productoServices";


function MostrarTabla({ productos, setProductos }) {
  

  
  const [categorias, setCategorias] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    precio: 0,
    categoria: '', 

  });



  

  useEffect(() => {
    // Cargar categorías al montar el componente
    categoriaServices.getAll()
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Error al cargar las categorías:', error);
      });
  }, []);



  const [editingProduct, setEditingProduct] = useState(null);



  const listarProductos = async () => {
    try {
      const response = await listarProductosPorCategoria(categoriaId);
      setProductos(response);
    } catch (error) {
      console.error('Error al obtener la lista de productos por categoría:', error);
    }
  };

  const handleInsert = async () => {
    try {
      await insertarProducto(newProduct, setProductos);
      setNewProduct({
        nombre: '',
        precio: 0,
        categoria: '', // Ajusta según tu modelo
      });
    } catch (error) {
      // Manejar el error si es necesario
    }
  };

  const handleDelete = async (id) => {
    try {
      await eliminarProducto(id, setProductos);
    } catch (error) {
      // Manejar el error si es necesario
    }
  };

  const handleUpdate = async () => {
    try {
      const { id } = editingProduct;
      await actualizarProducto(id, newProduct, setProductos);
      setEditingProduct(null);
      setNewProduct({
        nombre: '',
        precio: 0,
        categoria: '', // Ajusta según tu modelo
      });
    } catch (error) {
      // Manejar el error si es necesario
    }
  };
  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({
      nombre: product.nombre,
      precio: product.precio,
      categoria: product.categoria, // Ajusta según tu modelo
    });
  };

  const[categoriaId,setCategoriaId] = useState()

  const handleCategoryChange = (categoriaId) => {
    // Obtener la lista de productos por categoría y actualizar el estado
    listarProductosPorCategoria(categoriaId)
      .then(response => {
        setProductos(response);
      })
      .catch(error => {
        console.error('Error al obtener la lista de productos por categoría:', error);
      });

    // Actualizar el estado del select y el nuevo producto
    setNewProduct({
      ...newProduct,
      categoria: categoriaId,
    });
  };

  return (
    <>
      <div>
        {categorias.map(categoria => (
          <label key={categoria.id}>
          <input
            type="radio"
            value={categoria.id}
            checked={categoriaId === categoria.id}
            onChange={() => {

              handleCategoryChange(categoria.id);
            }}
          />
          {categoria.nombre}
        </label>
        ))}
      </div>
      <div className='mt-4 mx-5'>
        <Table bordered striped hover responsive>
          <thead><tr><th>Código</th><th>Descripción</th><th>Precio</th><th>Categorias</th><th>Opciones</th></tr></thead>
          <tbody>
            {productos.map(prod => {
              return (
                <tr key={prod.id}>
                  <td>{prod.id}</td>
                  <td>
                    {editingProduct && editingProduct.id === prod.id ? (
                      <input
                        type="text"
                        value={newProduct.nombre}
                        onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
                      />
                    ) : (
                      prod.nombre
                    )}
                  </td>
                  <td>
                    {editingProduct && editingProduct.id === prod.id ? (
                      <input
                        type="number"
                        value={newProduct.precio}
                        onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
                      />
                    ) : (
                      prod.precio
                    )}
                  </td>
                  <td>
                      {prod.categoria}
                  </td>
                  <td>
                    {editingProduct && editingProduct.id === prod.id ? (
                      <>
                        <Button variant="outline-success" className="mx-2" onClick={handleUpdate}>
                          Guardar
                        </Button>
                        <Button variant="outline-secondary" className="mx-2" onClick={() => setEditingProduct(null)}>
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline-danger" className="mx-2" onClick={() => handleEdit(prod)}>
                          Actualizar
                        </Button>
                        <Button variant="outline-danger" className="mx-2" onClick={() => handleDelete(prod.id)}>
                          Eliminar
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        </div>
      <div>
        <div><h2>Ingresar nuevo producto:</h2></div>
        <div className="container">
  <div className="row justify-content-center">
    <div className="col-md-6">
    <form>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={newProduct.nombre}
            onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            id="precio"
            value={newProduct.precio}
            onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoría</label>
          <select
            className="form-select"
            id="categoria"
            value={newProduct.categoria}
            onChange={(e) => setNewProduct({ ...newProduct, categoria: e.target.value })}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
        <Button variant="outline-primary" className="mx-2" onClick={handleInsert}>
          Insertar
        </Button>
      </form>
    </div>
  </div>
</div>

      </div>
    </>
  );
}

export default MostrarTabla;