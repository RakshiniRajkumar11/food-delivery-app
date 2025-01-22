import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";


export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat,setFoodCat] = useState([]);
  const [foodItem,setFoodItem] = useState([]);

  const loadData = async()=>{
  let response = await fetch('http://localhost:5000/api/foodData',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    }
  });

  response =await response.json();
  setFoodItem(response[0]);
  setFoodCat(response[1]);
  //console.log(response[0],response[1]);
  }

  useEffect(()=>{
    loadData()
  },[])



  return (
    <div>
      {/* <div>
        <Navbar />
      </div> */}
      <div>
      <div>
        <div id="carouselExampleControls" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel'>
    <div className='carousel-caption' style={{zIndex:"2"}}>

        <div className='d-flex justify-content-center '>
            <input className='form-control me-2 bg-light text-dark' type="search" placeholder="Search" aria-label='search' value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
            {/* {<button className='btn btn-outline-primary text-white bg-primary' type='submit'>Search</button>} */}
        </div>
    </div>
    <div className="carousel-item active">
      <img src="/food1.jpg" className="d-block w-100" style={{objectFit:"cover", height:"500px",width:"100%" ,filter:"brightness(50%)"}} alt="Wild Landscape"/>
    </div>
    <div className="carousel-item">
      <img src="/food3.jpg" className="d-block w-100" style={{objectFit:"cover", height:"500px" ,width:"100%",filter:"brightness(50%)"}} alt="Camera"/>
    </div>
    <div className="carousel-item">
      <img src="/food4.jpg" className="d-block w-100" style={{objectFit:"cover", height:"500px",width:"100%" ,filter:"brightness(50%)"}}  alt="Exotic Fruits"/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>
      </div>
      <div className="container bg-dark text-light">
        {foodCat != []
          ? foodCat.map((data) => {
              return ( <div className="row mb-3">
              <div key={data._id} className="fs-3 m-3">
                {data.CategoryName}
              </div>
              <hr />
              {
                foodItem != [] 
                ? foodItem.filter ((item)=> item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                .map(filterItems =>{
                  return (
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                      <Card foodItem ={filterItems}
                      options ={filterItems.options}
                      
                      />
                    </div>
                  )
                })
                : <div>No such data </div>
              }
              </div>
              )
            })
          : " "
          }

        
      </div>

      <div>
        {" "}
        <Footer />{" "}
      </div>
    </div>
  );
}
