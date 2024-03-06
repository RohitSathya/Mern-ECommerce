import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CartDisplay from './CartDisplay';
import './Cart.css'
import greentick from '../images/greentick.png'
import { addTotal,fastcount,getcount,removeqty,reset } from './Redux/totalslice';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function Cart({func,funce}) {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const reduxtotal=useSelector((state)=>state.total.total).toFixed(2)
  const reduxeachtotal=useSelector((state)=>state.total.eachtotal)
      
   const [cart,setcart]=useState([])
   let [count,setcount]=useState()
 

   let price;
   let [total,stotal]=useState(0)
   let [fl,sfl]=useState(0)
   let[dl,sdl]=useState(1)
   let [ry,sry]=useState(0)

  

  
   
   useEffect(()=>{

    async function getcart(){
        try{
          const userdetail=localStorage.getItem('userdetail')
          const parse=JSON.parse(userdetail)
            const response=await axios.get(`https://ecomercebackend-gamma.vercel.app/product/getcart/${parse._id}`)
         
            if(response.data.length!=undefined){
              setcart(response.data)
              setcount(response.data.length)
              //  price=cart.map((c)=>parseFloat(c.price.replace(' USD')))
            
              // let to=0
              // for(let x of price){
              //    to+=x

              // }
              const totalPrice = response.data.reduce((acc, item) => {
                const itemPrice = parseFloat(item.price.replace(' USD'));
                return acc + itemPrice;
              }, 0);
              stotal(totalPrice.toFixed(2))
            
             
            
       

            

            }
            else{
              stotal(0)
              sfl(0)
              dispatch(fastcount())
              sry(1)
            }
            
            
            
        }catch(e){
            console.log(e)
        }

    }
    getcart()

     
   
     
   },[count] )

   
   function getqty(index,price,qty){
    qty=qty-1
  
    const prices=parseFloat(price.replace(' USD'))
  
    const multiplyqtyprice=prices*qty
   
 
    dispatch(addTotal({prevtotal:total,index:index,mul:multiplyqtyprice}))
    
    sfl(1)
    

   }
   async function deletecart(e,index){
   
    console.log(e)
    const userdetail=localStorage.getItem('userdetail')
    const parse=JSON.parse(userdetail)
    const deleteresponse=await axios.delete(`https://ecomercebackend-gamma.vercel.app/product/deletecart/${parse._id}/${e}`)
    const {message}=deleteresponse.data
    if(message=='s'){
      console.log('vikram')
      const userdetail=localStorage.getItem('userdetail')
      const parse=JSON.parse(userdetail)
       
      const response=await axios.get(`https://ecomercebackend-gamma.vercel.app/product/getcart/${parse._id}`)
     
            
      setcart(response.data)
       setcount(response.data.length)
       const totalPrice = response.data.reduce((acc, item) => {
         const itemPrice = parseFloat(item.price.replace(' USD'));
         return acc + itemPrice;
       }, 0) || 0;
   
    
       stotal(totalPrice.toFixed(2))
       sfl(0)
      
     
       dispatch(getcount(response.data.length))
      
       console.log(response.data.length+'afterdel')
       localStorage.removeItem(`savedqty${index}`)
       console.log('totodsdsds'+total)

       dispatch(reset())
       dispatch(removeqty({index:index,val:0}))
     
      
      
    }
      
      

    
   


   }
   async function buy(){
     if(total==0 && reduxtotal==0 || ry==1){
      alert('your cart is empty cant proceed to payment page')
     }
     else{
      if(fl==0){
        const userdetail=localStorage.getItem('userdetail')
        const parse=JSON.parse(userdetail)
          const response=await axios.get(`https://ecomercebackend-gamma.vercel.app/product/getcart/${parse._id}`)
        
        func(total)
        funce(response.data)
        navigate('/buy')
  
       }
       else{
        const userdetail=localStorage.getItem('userdetail')
        const parse=JSON.parse(userdetail)
          const response=await axios.get(`https://ecomercebackend-gamma.vercel.app/product/getcart/${parse._id}`)
        console.log('total is'+total)
        console.log('total is'+reduxtotal)
        func(reduxtotal)
        funce(response.data)
        navigate('/buy')
       }

     }

   
   }
 
    

   
  
    
   
   
    
    
   
   
      

   
     
    
    
    
    
   
   
   
    
   
   
   

  

  return (
    <>
        <div className='total' style={{position:'fixed'}} >
        <img src={greentick} width='18px' height='18px' style={{paddingLeft:'15px',paddingTop:'20px'}}></img>
        <b style={{fontSize:'14px',fontWeight:'700',color:'darkgreen',marginTop:'-18px',marginLeft:'37px',whiteSpace:'nowrap'}}> Your order is eligible for FREE Delivery. </b>
        <b style={{marginTop:'20px',marginLeft:'20px',fontSize:'25px',fontWeight:'500'}}>Subtotal ({count} items)$:<b>{fl==0?(<>{total}</>):(<>{reduxtotal}</>)}</b></b><br/>
        <button style={{width:'258px',height:'29px',borderRadius:'8px',background:'#FFD814',borderColor:'#FCD200',marginLeft:'23px',marginTop:'15px'}} onClick={buy}>Proceed to Buy</button>
      
      </div>
   
    <div style={{display:'flex',flexDirection:'column'}}>
        {cart.length>0?(<>{cart.map((c,index)=><CartDisplay data={c} func={getqty} ke={index} deletes={deletecart}></CartDisplay>)}</>):(<><h1 style={{marginTop:'150px'}}>Your Cart is Empty !!!ADD Something</h1></>)}
    </div>

    
    </>
  )
}
