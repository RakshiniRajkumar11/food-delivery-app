
import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  //backgroundColor: 'rgb(34,34,34)',
  backgroundColor: '#f8f9fa', // Changed to a light color for a modern look
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%',
  borderRadius: '15px', // Added rounded corners for aesthetics
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)', // Added subtle shadow for depth
  padding: '20px' // Added padding for better spacing inside the modal
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .5)',
  zIndex: 999
}

export default function Modal({ children, onClose }) {

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onclose} />
      <div style={MODAL_STYLES}>
        <button className='btn bg-danger fs-4' 
        style={{ position: 'absolute', top: '10px', right: '10px'}} 
        onClick={onClose}> X </button>
        {children}
      </div>  
    </>,
    document.getElementById('cart-root')
  )
}
