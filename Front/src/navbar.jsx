import React, { useEffect, useState } from 'react'
import './navbar.css'
import royologo from '../images/logo.png'
import locationlogo from '../images/location.png'
import search from '../images/search.png'
import cartstore from '../images/cart.png' 
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import products from './Products'
import { useSelector } from 'react-redux'
import logout from '../images/log-out.png'
export default function navbar({data,func,namess,dco}) {
   const nav=useNavigate()
  
   const[count,setcount]=useState(data)
   const[name,setname]=useState()
 
   console.log(data)
   const counter=useSelector((state)=>state.total.count)
   const fakecounter=useSelector((state)=>state.total.fakecount)
   const fastcount=useSelector((state)=>state.total.fastcounte)

 
 
   
  
  
   useEffect(()=>{

   async function carts(){
 
    console.log('farziiiiiiiiiii')
    const userdetail=localStorage.getItem('userdetail')
    const parse=JSON.parse(userdetail)
         
      const response=await axios.get(`https://ecomerce-backend-1zbn.onrender.com/product/getcart/${parse._id}`)
      const {message}=response.data
      console.log('bugvna'+message)
      if(message=='f'){
            
  
      setcount(0)
      }
    else{
      console.log(response.data.length)
      setcount(response.data.length)
      console.log(count+'sdt')
    
    }
      

    }
    carts()

   },[data,counter,fakecounter,fastcount,dco])
   
   
   
   
   function go(){
        nav('/cart')
      
        
     }
     function handlechange(e){
      func(e.target.value)
     
       
     }

  return (
    <>
    <div className='navbar' id="navbar">
      <div className='logoe' onClick={()=>nav('/app')}>
      <img src={royologo}  className='np1'></img>
      </div>
      <div className='location'>
    
        
        <div className='l2'>
       
         
        <b style={{color:'white'}}>India Since 2018</b>

        </div>
        <div className='location_logo'>
          <img src={locationlogo}  className='np2'></img>
        </div>
        
     
      </div>
      <div className='search'>
        <input type='text' placeholder='Search Royofist.in' className='np3'  value={name} onChange={(e)=>handlechange(e)}></input>
        <div className='sb'>
          <img src={search}  className='np4' ></img>
        </div>
      </div>
      <div className='sign'>
        <b style={{color:'white'}}>Hello,{namess}</b>
      </div>
      <div className='orders' onClick={()=>nav('/order')}>
        <b style={{color:'white'}} className='boa'>Your Orders</b>
      </div>
      <div className='cart'>
        <img src={cartstore} height='50px' onClick={go}></img>
        <div className='cartcount'><b style={{color:'red',fontSize:'28px'}} id='count'>{count}</b></div>

        <div className='lout'>
        <img src={logout} className='louti'  height='30px' onClick={()=>{nav('/login')}}></img>

        </div>
       
        

      </div>
     

    </div>
   
    </>
  )
}
