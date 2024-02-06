import React, { useEffect, useState } from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fastcount } from './Redux/totalslice'
import axios from 'axios'
import logo from '../images/royologo.png'
import signbox from '../images/signbox.png'
import loginbox from '../images/loginbox.png'
import './reg.css'
export default function signup() {
  const dispatch=useDispatch()
  useEffect(()=>{
    const navid=document.getElementById('navbar')
    
    navid.style.display='none'
},[])
const navigate=useNavigate()
const [name,setname]=useState()
const [phoneno,setphoneno]=useState()
const [email,setemail]=useState()
const [password,setpassword]=useState()


async function submit(){
  
  const response=await axios.post('https://ecomerce-backend-1zbn.onrender.com/product/register',{name:name,phoneno:phoneno,email:email,password:password})
  const {message}=response.data
  if(message=='failed'){
    alert('sorry create another email already exists')
  }
  else{
    
    const {userdetail}=response.data
    localStorage.setItem('userdetail',JSON.stringify(userdetail))
    dispatch(fastcount())
  navigate('/app')
  const navid=document.getElementById('navbar')
  navid.style.display='flex'

  }


    
  
  
}



 
   
  
    
  return (
    <>
    <div className='logo' >
      <img src={logo} height='80px'></img>
      <div className='boxx'>
        <img src={signbox}></img>
        <h1 style={{marginTop:'-665px',paddingLeft:'20px',fontWeight:'500'}} >Create Account</h1>
        <h3 style={{paddingLeft:'25px',fontWeight:'550'}}>Your Name</h3>
        <div className='i1'>
        <input type='text' placeholder='First and last name' style={{width:'300px',height:'25px',fontWeight:'550',fontFamily:'sans-serif',paddingLeft:'5px'}} value={name} onChange={(e)=>setname(e.target.value)}></input>
        </div><br/>
        <div className='mn2'></div>
        <h3 style={{paddingLeft:'25px',fontWeight:'550',paddingTop:'px'}}>Mobile Number</h3>
        <div className='i2'>
        <input type='text' placeholder='Mobile Number' maxLength="10" style={{width:'300px',height:'25px',fontWeight:'550',fontFamily:'sans-serif',paddingLeft:'5px'}} value={phoneno} onChange={(e)=>setphoneno(e.target.value)}></input>

        </div><br/>
        <div className='mn2'></div>
        <h3 style={{paddingLeft:'25px',fontWeight:'550',paddingTop:'px'}}>Email</h3>
        <div className='i3'>
        <input type='text' placeholder='Email' maxLength="30" style={{width:'300px',height:'25px',fontWeight:'550',fontFamily:'sans-serif',paddingLeft:'5px'}} value={email} onChange={(e)=>setemail(e.target.value)}></input>

        </div><br/>
        <div className='mn2'></div>
        <h3 style={{paddingLeft:'25px',fontWeight:'550',paddingTop:'px'}}>Password</h3>
        <div className='i3'>
        <input type='password' placeholder='Password' maxLength="25"  style={{width:'300px',height:'25px',fontWeight:'550',fontFamily:'sans-serif',paddingLeft:'5px'}} value={password} onChange={(e)=>setpassword(e.target.value)}></input>
        

        </div><br/>
        <div className='but'>
        <button style={{background:'#FFD814',borderColor:'#FCD200',borderRadius:'8px',width:'310px',height:'30px',fontWeight:'560'}} onClick={submit}>Create Account</button>
        </div>
        <p  className='sp1' style={{marginLeft:'30px',marginTop:'30px',fontWeight:'520'}} >Already have an account?</p>
        <p className='sp2' style={{marginTop:'-36px',marginLeft:'190px',color:'#0066c0',cursor:'pointer'}} onClick={()=>navigate('/login')}>Sign in</p>
        <b  className='sp3' >By creating an account or logging in, you agree to</b>
        <div className='co'></div>
        <b  className='sp4'>Royofist’s Conditions of Use and Privacy Policy.</b>
        <p className='sp5' >© 2023-2024, Royofist.com, Inc. or its affiliates</p>

        

      </div>
      
    </div>
    </>
  )
}
