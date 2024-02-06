import React, { useEffect, useState } from 'react'
import './buypage.css'
import axios from 'axios'
import close from '../images/close.png'
import tick from '../images/tick.png'
import card from '../images/cards.png'
import {useNavigate} from 'react-router-dom'
import { fastcount,postorder } from './Redux/totalslice'
import {  useDispatch } from 'react-redux'
export default function BuyPage({data,data2,func}) {

  const [ord,sord]=useState(data2)
  const nav=useNavigate()
  const dispatch=useDispatch()
  useEffect(()=>{
    if(data!=undefined){
      localStorage.setItem('ordertotal',JSON.stringify(data))
    }
    

  },[])
 
    console.log(data2)
    const [country,setcountry]=useState('India')
    const [name,setname]=useState()
    const[pno,setpno]=useState()
    const[pincode,setpincode]=useState()
    const [area,setarea]=useState()
    const [Landmark,setlandmark]=useState()
    const [savedadd,setsavedadd]=useState({name:'s',pincode:'s',area:'s',landmark:'s'})
    const[parsetot,setparsetot]=useState()
    const[fl,sfl]=useState(0)
    const[mf,smf]=useState(0)
    const[cardnumber,setcardnumber]=useState('')
    const[cardexpdate,setcardexpdate]=useState('')
    const[cardexpyear,setcardexpyear]=useState('')
    const[ch,sch]=useState(0)
    let[al,sal]=useState(1)


    useEffect(()=>{

      console.log(data+'34534343432')
      const f=localStorage.getItem('ordertotal')
      const parsetotal=JSON.parse(f)
      setparsetot(parsetotal)
      console.log(parsetotal)


      async function getad(){
        const userdetail=localStorage.getItem('userdetail')
        const parse=JSON.parse(userdetail)
        const response=await axios.get(`https://ecomerce-backend-1zbn.onrender.com/product/getaddress/${parse._id}`)
        const {message}=response.data
        console.log(message)
        if(message=='s'){
          const sa=document.getElementById('savedaddress')
          const da=document.getElementById('address1')
          const payment=document.getElementById('payment')
          const {addressofuid}=response.data
          setsavedadd(addressofuid)
          localStorage.setItem('useraddress',JSON.stringify(addressofuid))
          sa.style.display='block'
          da.style.display='none'
          payment.style.display='block'
          console.log(addressofuid)
          smf(1)
        }
     
    
    
  

      }
      getad()
   


    },[fl])
     
    async function address(){
      if(mf!==0){
        const userdetail=localStorage.getItem('userdetail')
        const parse=JSON.parse(userdetail)
        const upad=await axios.put(`https://ecomerce-backend-1zbn.onrender.com/product/updateaddress/${parse._id}/${name}/${pno}/${Landmark}/${pincode}/${area}`)
        sfl(fl+1)
      }
      else{
        const userdetail=localStorage.getItem('userdetail')
        const parse=JSON.parse(userdetail)
        console.log(parse._id)
  
        const response=await axios.post('https://ecomerce-backend-1zbn.onrender.com/product/address',{country:country,name:name,phoneno:pno,pincode:pincode,area:area,landmark:Landmark,uid:parse._id})
        const {addressdata}=response.data
        console.log(addressdata)
        sfl(fl+1)
     

      }
   
       
    }
   async function editad(){
      const sa=document.getElementById('savedaddress')
      const da=document.getElementById('address1')
      const payment=document.getElementById('payment')
      sa.style.display='none'
      da.style.display='block'
      payment.style.display='none'
      

   

    }

 function pay(){




  
 
 
   
  
   if(/^[0-9]*$/.test(cardnumber) && cardnumber.length==16 && /^[0-9]*$/.test(cardexpdate) && cardexpdate.length==2 && (cardexpdate>=1 && cardexpdate<=12) && /^[0-9]*$/.test(cardexpyear) &&  cardexpdate.length==2 && (cardexpyear>=24 && cardexpdate<=50)  ){
    console.log('hydra')
    const userdetail=localStorage.getItem('userdetail')
    const parse=JSON.parse(userdetail)
   async function dcart(){
 
     const res=await axios.delete(https://ecomerce-backend-1zbn.onrender.com/product/dcart/${parse._id}`)
     const {message}=res.data
     if(message=='s'){
      dispatch(fastcount())
      dispatch(postorder(ord))
      const res=await axios.post(`https://ecomerce-backend-1zbn.onrender.com/product/order`,{ord})
      console.log(JSON.stringify(res.data)+'kesav')
      
     }
  
   
   
   }
   dcart()

    console.log('all correct')
    const suc=document.getElementById('success')
    suc.style.display='flex'
    var divsToBlur = document.querySelectorAll('.box, .payment, .savedaddress');
    divsToBlur.forEach(function(div) {
      div.classList.add('blurred');
  });
    setTimeout(()=>{
      divsToBlur.forEach(function(div) {
      
        div.classList.remove('blurred');
       

       
        nav('/app')
       
    });
      
       suc.style.display='none'
       
    },5000)

  

   }
   else{
     alert('invalid card details!!!')
   }
  

   


 
 
  
 }


  return (
    <div>
        <h2 style={{color:'red'}}>Order Total : {data==undefined?(<>{parsetot}</>):(<>{data}</>)}</h2>

        <div className='address1' id='address1'>
          <h1>Add a Address</h1>
          <div className='box'>
            <img src={close} width='30px' height='30px' style={{marginLeft:'545px',marginTop:'15px'}} onClick={()=>sfl(fl+1)}></img>
            <label className='l1' style={{marginTop:'20px',marginLeft:'20px'}}>Country/Region</label>
            <select value={country} onChange={(e)=>setcountry(e.target.value)} style={{width:'500px',height:'30px',marginLeft:'20px',marginTop:'10px',fontWeight:'550'}}>
              <option value="India">India</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United State">United State</option>
            </select>
            <label className='l1' style={{marginTop:'35px',marginLeft:'20px'}} >Full Name (First and Last Name)</label>
            <input type='text' style={{width:'493px',height:'22px',marginLeft:'20px',marginTop:'10px',fontWeight:'550'}} value={name} onChange={(e)=>setname(e.target.value)}></input>
            <label className='l1' style={{marginTop:'35px',marginLeft:'20px'}}>Mobile Number</label>
            <input type='text' maxLength="10" style={{width:'493px',height:'22px',marginLeft:'20px',marginTop:'10px',paddingLeft:'5px',fontSize:'15px',fontWeight:'550'}} value={pno} onChange={(e)=>setpno(e.target.value)}></input>
            <label className='l1' style={{marginTop:'35px',marginLeft:'20px'}}>Pincode</label>
            <input type='text' style={{width:'493px',height:'22px',marginLeft:'20px',marginTop:'10px',paddingLeft:'5px',fontSize:'15px',fontWeight:'550'}} maxLength="6" value={pincode} onChange={(e)=>setpincode(e.target.value)}></input>
            <label className='l1' style={{marginTop:'35px',marginLeft:'20px'}}>Area</label>
            <input type='text' style={{width:'493px',height:'22px',marginLeft:'20px',marginTop:'10px',paddingLeft:'5px',fontSize:'15px',fontWeight:'550'}} value={area} onChange={(e)=>setarea(e.target.value)}></input>
            <label className='l1' style={{marginTop:'35px',marginLeft:'20px'}}>Landmark</label>
            <input type='text' style={{width:'493px',height:'22px',marginLeft:'20px',marginTop:'10px',paddingLeft:'5px',fontSize:'15px',fontWeight:'550'}} maxLength="26" value={Landmark} onChange={(e)=>setlandmark(e.target.value)}></input>
            <button style={{width:'120px',height:'33px',background:'#FFD814',borderColor:'#FCD200',fontSize:'13px',borderRadius:'6px',marginTop:'20px',marginLeft:'30px',fontWeight:'600'}} onClick={address}>Use this address</button>
          
          </div>
          
         

        </div>
        <div className='savedaddress' id='savedaddress'>
          <div className='savedbox'>
           <b> {savedadd.name}</b><br/>
           <b>{savedadd.area}</b><br/>
           <b>{savedadd.landmark}</b><br/>
           <b>{savedadd.pincode}</b><br/>
            <button onClick={editad} style={{background:'#FFD814',border:'#FCD200',borderRadius:'6px',marginTop:'30px',height:'30px',width:'100px'}}>Edit</button>
        
           
           

          </div>
        </div>
      
        <div className='payment' id='payment'>
        <h2 color='darkblue'>Payment Details</h2>
        <b>Card Number</b><br/>
        <div className='inscard'>
      
        <input type='text' maxLength="16" value={cardnumber} onChange={(e)=>setcardnumber(e.target.value)} style={{width:'500px',height:'26px',borderRadius:'5px',fontSize:'18px'}}></input>

        </div>
        <div className='expd'>
        <b>Exp Month</b>
        </div>
        <div className='inscard'>
      
        <input type='text' maxLength="2" value={cardexpdate} onChange={(e)=>setcardexpdate(e.target.value)} style={{width:'50px',height:'16px',borderRadius:'5px',fontSize:'18px',paddingLeft:'18px'}}></input>

        </div>
        <div className='expy'>
          <b>Exp Year</b>
        </div>
        <div className='insyear'>
        <input type='text' maxLength="2" value={cardexpyear} onChange={(e)=>setcardexpyear(e.target.value)} style={{width:'50px',height:'16px',borderRadius:'5px',fontSize:'18px',paddingLeft:'18px'}}></input>
          
        </div>
        <div className='payb'>
        <button style={{background:'#FFD814',border:'#FCD200',borderRadius:'6px',height:'50px',width:'200px',fontSize:'16px',fontWeight:600}} onClick={pay}>Pay and Order</button>
        <div className='acc'>
        <b>Accepted Here</b>
        </div>
        <img src={card}></img>
        </div>
        
    
      
       
        </div>
        <div className='success' id='success'>
          <div className='simg'>
          <img src={tick} height='100px' marginLeft='20px' marginTop='20px'></img>
          </div>
          <div className='sword'>
          <h2 style={{whiteSpace:'nowrap'}}>Your Order Has Placed Succesfully!!!</h2>
          </div>
     
          

        </div>

        
    </div>
  )
}
