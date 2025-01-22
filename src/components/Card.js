import React, { useEffect, useRef, useState } from "react";
import {useDispatchCart, useCart} from './ContextReducer'

export default function Card(props) {

  let dispatch = useDispatchCart();
  let data = useCart();
  
  const priceRef = useRef();
  let options = props.options;
  const {foodItem}=props;
  let priceOptions = options && options.length > 0 ? Object.keys(options[0]) : [];
  const [qty,setQty] = useState(1);
  const [size,setSize] = useState("");

  

  // const handleAddToCart = async() =>{

  //   let food =[]
  //   for (const item of data){
  //     if(item.id === props.foodItem._id){
  //       food = item;
  //       break;
  //     }
  //   }

  //   if(food != [] ){
  //     if(food.size === size){
  //       await dispatch ({ type: "UPDATE", id:foodItem._id, price: finalPrice, qty:qty})
  //       return
  //     }
  //     else if(food.size !== size){
  //       await dispatch({
  //         type: "ADD",
  //         id: foodItem._id,
  //         name: foodItem.name,
  //         price: finalPrice,
  //         qty: qty,
  //         size: size,
  //       })
  //       return
  //     }
  //     return
  //   }
    
    
    //await console.log(data);

    const handleAddToCart = async () => {
      let food = data.find((item) => item.id === props.foodItem._id && item.size === size);
      
      if (food) {
        // If the item with the same ID and size exists, update its quantity
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty, size: size });
      } else {
        // If the item does not exist with the same size, add a new item to the cart
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: foodItem.img,
        });
      }
    };
    

  //   await dispatch({
  //     type: "ADD",
  //     id: foodItem._id,
  //     name: foodItem.name,
  //     price: finalPrice,
  //     qty: qty,
  //     size: size,
  //   });
  // }

  let finalPrice = qty * parseInt(options[0][size]);
  
  useEffect(()=>{
    
      setSize(priceRef.current.value); // Set default size to the first option
  }, []);
  // useEffect(()=>{
  //   console.log("Options:", options);
  // console.log("Selected size:", size);
  // console.log("Final price:", finalPrice);
  // },[qty,size]);

  return (
    <div>
      <div>
        <div
          className="card mt-3 text-dark bg-light"
          style={{ width: "18rem", maxHeight: "460px" }}>
          <div>
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{objectFit: 'cover', height: '200px', width: '100%'}} />
          </div>
          <div className="card-body" style={{zIndex:"2"}}>
            <h5 className="card-title">{props.foodItem.name}</h5>
            <p className="card-text"></p>
            <div className="container w-100 ">

              {/* <select className="m-2 h-100 bg-light" onChange={(e)=> setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })};
              </select> */}

              {/* Quantity Selector with + and - buttons */}
            <div className="d-flex align-items-center mb-2">
              <button 
                className="btn btn-outline-secondary" 
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                disabled={qty === 1}
              >
                -
              </button>
              <span className="mx-3">{qty}</span>
              <button 
                className="btn btn-outline-secondary" 
                onClick={() => setQty((prev) => prev + 1)}
              >
                +
              </button>
            </div>


              <select className="m-2 h-100 bg-light rounded" ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
              {priceOptions.map((data) => {
                  
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>

              <div className="d-inline h-100 fs-6 text" >Rs.{finalPrice}/-</div>
            </div>
            
            <hr>
            </hr>
            <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>

    </div>
  );
}
