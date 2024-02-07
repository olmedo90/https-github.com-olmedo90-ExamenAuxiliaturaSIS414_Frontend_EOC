import React, { useState, useEffect } from 'react';
import { Link, Outlet, } from 'react-router-dom';
import Swal from 'sweetalert2';
import ModalProduct from './ModalProduct';



const Product = () => {
 // modal
 const [show, setShow] = useState(false);//activar
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);

 //CRUD

 const Api = 'http://localhost:5000/api/products';
 const [products, setProduct] = useState([]);
 const [updateList, setupdateList] = useState(false);
 const updateEdit = () => setupdateList(!updateList);

 //GET

 useEffect(() => {
   const get = async () => {
     await fetch(`${Api}/listProducts`)
       .then((response) => response.json())
       .then((json) => {
         setProduct(json);
       })
   }
   get();
 }, [updateList])

 //DELETE

async function eliminar(e) {
   const id = e;

      await fetch(`${Api}/deleteProducts/${id}`, { method: 'DELETE' })
         .then((response) => response.json())
         .then((json) => {
         
           let updateComentarios = [...products].filter(i => i._id !== id);
                           setProduct(updateComentarios);
                       
           })
    
 }
 // Editar
 const [modoEditar, setModoEditar] = useState(false);
 const editShow = () => setModoEditar(true);
 const [datos, setDatos] = useState([]);
 function editar(product) {
   editShow();
   handleShow();
   setDatos(product);
 }
  return (
    <div>
      <nav>
        <button className='btn btn-success' onClick={handleShow}>
          Agregar producto
        </button>
      </nav>
      <br />
      {show && <ModalProduct
        handleClose={handleClose}
        handleShow={handleShow}
        modoEditar={modoEditar}
        datos={datos}
        updateList={updateEdit}
      />}

      <div className='row mt-3'>
        <table className='table table-dark'>
          <thead>
            <tr>
              <th>Detalles</th>
              <th>Precio</th>
              <th>comentario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product) => (
                <tr key={product._id}>
                  <th>{product.detail}</th>
                  <th>{product.price}</th>
                  <th>{product.comment }</th>
                  <th className='row d-flex justify-content-between'>
                    <button className='btn btn-info col-md-4' onClick={() => editar(product)}>editar</button>
                    <button className='btn btn-danger col-md-4' onClick={() => eliminar(product._id)}>eliminar</button>
                  </th>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div>
        <h4><Outlet /></h4>
      </div>
    </div>
  )
}

export default Product