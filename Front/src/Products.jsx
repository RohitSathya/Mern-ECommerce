import React, { useEffect } from "react";
import { fastcount } from "./Redux/totalslice";
import axios from 'axios'
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import './products.css'
function products({data,func,namefunc,pi}){
  const navigate=useNavigate()
  const dispatch=useDispatch()
    let e='10px';
  if(data.count!=1){
        e='20px'
}

   
      useEffect(()=>{

     
        const userdetail=localStorage.getItem('userdetail')
        if(!userdetail){
          console.log('null')
        }
        else{
         const parse=JSON.parse(userdetail)
         const names=parse.name
         namefunc(names)
    
         
        }
        
      },[])
   
      function imgclick(){
        pi(data)
        navigate('/productinfo')

      }
    

    async function cart(){

      const userdetail=localStorage.getItem('userdetail')
      const parse=JSON.parse(userdetail)
       
      
        try{
          const response=await axios.post('http://localhost:8080/product/cart',{name:data.name,category:data.category,price:data.price,image:data.image,uid:parse._id})
          const {message}=response.data
          if(message=='f'){
            alert('Product already have been added to cart')
          }
          else{
            const count=await axios.get(`http://localhost:8080/product/getcart/${parse._id}`)
            dispatch(fastcount())
         
            func(count.data.length)

          }
     
          

        }catch(e){
            console.log(e)
        }
        


       

    }

    return(
        <>
        <div className="pro" style={{display:'flex',flexDirection:'column',marginLeft:`${e}`}}>
         <img src={data.image} width='100%' height='300px' onClick={imgclick}></img>   
        <b style={{marginLeft:'90px',paddingTop:'5px'}}>{data.name}</b>
         <b style={{marginLeft:'90px'}}>{data.price}</b>
         <b style={{marginLeft:'90px'}}>Category:{data.category}</b>
         <button className="b1" onClick={cart}>Add to Cart</button>
        
        </div>
         
        </>
    )

}

export default products