import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import DisplayOrder from './DisplayOrder'
export default function Myoder() {
  const [order,setorder]=useState([])
  const [res,setres]=useState('s')
  const fastcount=useSelector((state)=>state.total.fastcounte)
  
  useEffect(()=>{

    const userdetail=localStorage.getItem('userdetail')
    const parse=JSON.parse(userdetail)
    
    async function getorder(){
      const response=await axios.get(`http://localhost:8080/product/getorder/${parse._id}`)
      const {message}=response.data
      if(message=='f'){
        setres('f')

      }
      else{
        console.log(response.data)
        setorder(response.data)
      }
     
    }
    getorder()
  },[fast])

  function fast(){

  }
  
  return (
    <>

    {res=='s'?(<>{order.map((o)=><><div className='ordertab' style={{display:'flex',flexDirection:'column'}}>
      <DisplayOrder data={o} func={fast}/>
      </div></>)}</>):(<><h1>Your Order is Empty!!!</h1></>)}
   
 
    </>
  )
}
