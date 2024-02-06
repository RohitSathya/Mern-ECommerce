import React from 'react'
import './displayorder.css'
import axios from 'axios'
import {fastcount} from './Redux/totalslice'
import { useDispatch } from 'react-redux'
export default function DisplayOrder({data,func}) {
  const dispatch=useDispatch()

  async function cancel(){
     
    const userdetail=localStorage.getItem('userdetail')
    const parse=JSON.parse(userdetail)
    const response=await axios.delete(`https://ecomerce-backend-1zbn.onrender.com/product/deleteorder/${parse._id}/${data._id}`)
    const {message}=response.data
    if(message=='s'){
      dispatch(fastcount())
      func()
    }

  }

  return (
   <>
   <div className='orderbox'>
    <img src={data.image} height='200px' width='250px'></img>
    <div className='orderde'>
      <b style={{fontSize:'26px'}}>{data.name}</b>
      <b style={{fontSize:'26px'}}>{data.price}</b>
      <b style={{fontSize:'26px'}}>{data.category}</b>
    </div>
    <div className='arrive'>
      <b style={{color:'orangered',fontSize:'22px'}}>Arriving at Wednesday</b>
      <b style={{color:'orangered',fontSize:'18px'}}>By 9PM</b>
    </div>
    <div className='canord'>
      <button style={{background:'#FFD814',borderColor:'#FCD200',width:'100px',height:'30px',borderRadius:'6px',fontSize:'13px',fontWeight:'600'}} onClick={cancel}>Cancel Order</button>
    </div>
   </div>
   </>
  )
}
