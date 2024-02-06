import React, { useState } from 'react'
import { useEffect } from 'react'
import loginbox from '../images/loginbox.png'
import logo from '../images/royologo.png'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fastcount } from './Redux/totalslice'
import axios from 'axios'
export default function login() {
  const navigate=useNavigate()
  const dispatch=useDispatch()

    useEffect(()=>{
      
        const navid=document.getElementById('navbar')
        console.log(navid)
        navid.style.display='none'
    },[])

    const[email,setemail]=useState()
    const[password,setpassword]=useState()

    async function submit(){
      const response=await axios.post('https://ecomerce-backend-1zbn.onrender.com/product/login',{email:email,password:password})
      const {message}=response.data
      if(message=='failed'){
        alert('wrong email and password')
      }
      else{
        console.log(response.data)
        const {userdetail}=response.data
        localStorage.setItem('userdetail',JSON.stringify(userdetail))
        console.log(response.data)
        dispatch(fastcount())
        navigate('/app')
        const navid=document.getElementById('navbar')
        navid.style.display='flex'
      }

    }
  return (
    <>
    <div className='loginlogo'>
      <img src={logo} height='80px'></img>
      <div className='boxx2'>
      <img src={loginbox}></img>
      <h1 style={{marginTop:'-430px',paddingLeft:'35px',fontWeight:'500'}} >Sign in</h1>
      <h3 style={{paddingLeft:'38px',fontWeight:'550'}}>Email</h3>
      <div className='ii1'>
        <input type='text' className='lp1' style={{width:'300px',height:'28px',fontWeight:'550',fontFamily:'sans-serif',position:'fixed',paddingLeft:'5px'}} value={email} onChange={(e)=>setemail(e.target.value)}></input>
        </div><br/>
        <h3 style={{paddingLeft:'38px',fontWeight:'550',paddingTop:'10px'}}>Password</h3>
        <div className='ii2'>
        <input type='text' style={{width:'300px',height:'28px',fontWeight:'550',fontFamily:'sans-serif',position:'fixed',paddingLeft:'5px'}} value={password} onChange={(e)=>setpassword(e.target.value)}></input>
        </div><br/>
        <div className='butt'>
        <button style={{background:'#FFD814',borderColor:'#FCD200',borderRadius:'8px',width:'310px',height:'30px',fontWeight:'560'}} onClick={submit}>Sign in</button>
        </div>
        <div className='comment'>
        <b style={{marginLeft:'25px',fontSize:'14px',color:'darkblue'}}>By Continuing you agree to Royofist's Conditions of</b><br/>
        <b style={{marginLeft:'25px',fontSize:'14px',color:'darkblue'}}>Use and Privace Notice</b>
        <p style={{marginLeft:'130px',fontSize:'17px',fontWeight:'550'}}>New to Royofist?</p>
        <div className='butt3'>
        <button style={{background:'#FFF',borderColor:'#D5D9D9',borderRadius:'8px',width:'310px',height:'30px',fontWeight:'560'}} onClick={()=>navigate('/')}>Create your Royofist Account</button>
        </div>
        
        </div>
      
      </div>
    </div>

    </>
  )
}
