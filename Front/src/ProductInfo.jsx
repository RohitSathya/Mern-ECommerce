import React, { useState } from 'react'
import './productinfo.css'
import features from '../images/features.png'
import axios from 'axios'
import { fastcount } from './Redux/totalslice'
import { useDispatch } from 'react-redux'
export default function ProductInfo({data}) {
  const dispatch=useDispatch()
    
   const [ati,setati]=useState(data.ati)
  
  async function test(){
     
    const userdetail=localStorage.getItem('userdetail')
    const parse=JSON.parse(userdetail)
    const response=await axios.post('https://ecomerce-backend-1zbn.onrender.com/product/cart',{name:data.name,category:data.category,price:data.price,image:data.image,uid:parse._id})
    const {message}=response.data
    if(message=='f'){
      alert('Product already have been added to cart')
    }
    else{
      const count=await axios.get(`http://localhost:8080/product/getcart/${parse._id}`)
      dispatch(fastcount())
   
      

    }
    
   }
  
  return (
     <>
     <div className='pim'>
     <img src={data.image} width='500px' height='700px'></img>
     </div>
     <div className='pcon'>
      <h1>{data.name}({data.description})</h1>
      <div className='rat'>
      <b style={{fontSize:'20px'}} >{data.rating}</b>
      <img src={data.ratingimg} height='20px' ></img>

      </div>
      <div className='lpur'>
        <b>{data.pur}</b>
      </div>
      <div className='bline'></div>

      <div className='pdis'>
        <b style={{color:'red',fontSize:'31px'}}>{data.dis}</b>
      </div>
      <div className='prate'>
      <b style={{color:'black',fontSize:'28px'}}>$ {data.price}</b>

      </div>
      <div className='pmrp'>
        <p style={{color:'grey',fontSize:'13px'}}>MRP:$ {data.mrp}</p>
      </div>
      <div className='pmrpline'></div>

      <div className='ptax'>
        <p style={{marginLeft:'60px',marginTop:'30px',fontWeight:'500',fontSize:'18px'}}>Including all taxes</p>
      </div>
      <div className='feat'>
        <img src={features}></img>
      </div>
      <div className='ati'>
        <b style={{fontSize:'23px'}}>About this item</b>
        
      </div>
      <div className='ati2'>
        {ati.map((a)=><><li style={{fontSize:'19px'}}>{a}</li><br/></>)}
       
      </div>
      <button onClick={test} className='pb1e'>Add to Cart</button>
     
     </div>
     </>
  )
}
