import React, { useState, useEffect } from 'react';
import {Button, Modal} from 'react-bootstrap';

const ModalProduct = ({handleClose, handleShow, modoEditar, datos, updateList}) => {
  const datosForm={
    detail:'',
    price:'',
    comment:'',
  };

  const [form, setForm]=useState(datosForm)
  
  const handleChange=(e)=>{
   
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  //crud
  const Api='http://localhost:5000/api/products';
  const handleSubmit= async(e)=>{ 
    e.preventDefault();       
    await fetch(`${Api}/createProducts`,{
      method: 'POST',
      body: JSON.stringify(form),
      headers:{
        'content-type': 'application/json',
      }
      
    }).then(res=>res.json())
    .then((result)=>{
      handleClose();
      updateList();
    })
  }
  //editar 
  const id = datos._id;
 // console.log(datos)
useEffect(()=>{
  if(modoEditar){
   // console.log('editando')
    setForm(datos);
    console.log(datos)
    return;
  }
},[]) 
  const insertEditar = async(e)=>{
    e.preventDefault();
    console.log('ESTAMOS EDITANDO');
    await fetch(`${Api}/updateProducts/${id}`, 
    {
      method: "PUT",
      body: JSON.stringify(form),
      headers:{
        'Accept': 'application/form-data',
        'content-type': 'application/json',
      }
      
    }).then(res=>res.json())
    setForm(datosForm);
    handleClose();
    updateList();

  }
  const opEdit=()=>{
    handleClose();
  }
  return (
    <>
    
    <Modal show={handleShow} onHide={modoEditar?opEdit:handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modoEditar?'Editar Comentario':'Agregar Comentario'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form className='row' onSubmit={modoEditar ? insertEditar : handleSubmit} >
      <label htmlFor="lbDetail" className='col-md-2'> Detalles</label>
      <input type="text"
      name='detail'
      id='lbDetail'
      placeholder='Escriba su detalles del producto'
      className='col-md-9 mb-3'
       onChange={handleChange}
      value={form.detail||""}
     
      />
       <label htmlFor="lblPrice" className='col-md-2'> price</label>
      <input type="number"
      name='price'
      id='lblPrice'
      placeholder='Escriba su price'
      className='col-md-9 mb-3'
      onChange={handleChange}
      value={form.price||""}
      />
       <label htmlFor="lblPricom" className='col-md-2'> Comentario</label>
      <input type="text"
      name='comment'
      id='lblPrice'
      placeholder='Escriba su comentario'
      className='col-md-9 mb-3'
      onChange={handleChange}
      value={form.comment||""}
      />
      <input type="submit" value="Enviar" className="btn btn-primary" />
      <input type="reset" value="borrar" className="btn btn-warning"/>
    </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default ModalProduct