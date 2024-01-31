import React, { useEffect, useState } from 'react'
import './CartDisplay.css'
import axios from 'axios'
export default function CartDisplay({data,func,ke,deletes}) {

   const [selectedoption,getselectedoption]=useState()

  

   useEffect(()=>{
     const sq=localStorage.getItem(`savedqty${ke}`)
     if(sq){
      getselectedoption(sq)
      func(ke,data.price,sq)
     }
     else{
      getselectedoption(1)
     }
   },[deletecart])

   function handlechange(e){
    getselectedoption(e.target.value)

     func(ke,data.price,e.target.value)
     localStorage.setItem(`savedqty${ke}`,e.target.value)
 

   }
   function deletecart(){
      deletes(data._id,ke)
   }




  return (
    <>
    <div className='pros' style={{display:'flex',flexDirection:'column'}}>
        <img src={data.image} width='100%' height='300px' ></img>   
        <b style={{marginLeft:'90px',paddingTop:'5px'}}>{data.name}</b>
         <b style={{marginLeft:'90px'}}>{data.price}</b>
         <b style={{marginLeft:'90px'}}>Category:{data.category}</b>
         <select value={selectedoption} onChange={handlechange} >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
         </select>
       
       
         <b style={{marginLeft:'200px',marginTop:'10px',color:'red'}} onClick={deletecart}>Delete</b>
  
    </div>
   
    
    </>
  )
}
