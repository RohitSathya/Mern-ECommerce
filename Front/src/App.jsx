import { useEffect, useState } from 'react'
import Products from './Products'
import Cart from './Cart'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import royologo from '../images/logo.png'
import locationlogo from '../images/location.png'
import search from '../images/search.png'
import './App.css'
import cartstore from '../images/cart.png' 
import Navbar from './navbar'
import Sample from './sample'
import Login from './login'
import BuyPage from './BuyPage'
import Signup from './signup'
import Myoder from './Myoder'
import ProductInfo from './ProductInfo'

import threepoint5 from '../images/3.5.png'
import four from '../images/4.0.png'
import fourpoint5 from '../images/4.5.png'
import five from '../images/5.0.png'
function App() {

   const[buyprice,setbuyprice]=useState()
  const[count,setcount]=useState()
  const [username,setusername]=useState()
  const [buydata,setbuydata]=useState([])
  const [productinfo,setproductinfo]=useState({})

  const products = [
  {
    name: 'Iphone13',
    category: 'Mobile',
    price: '400.66 USD',
    image: 'https://images.pexels.com/photos/1647976/pexels-photo-1647976.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 1,
    description: 'Secured and Ultra fast mobile',
    brand: 'Apple',
    rating: 5.0,
    t: ['Argan Oil', 'Coconut Oil', 'Vitamin E'],
    ratingimg:four,
    pur:'500+ purchased last month',
    mrp:'800.32',
    dis:'50%',
     ati: [
      'Sleek design and premium build quality, powered by cutting-edge A-series chips.',
       'Leading-edge camera technology with features like Portrait mode and Night mode.',
       'Integration into the cohesive Apple ecosystem, ensuring seamless connectivity between devices.',
       'Emphasis on security and privacy, featuring Face ID or Touch ID for biometric authentication.',
       'Regular updates and support, maintaining the longevity and performance of the iPhone.'

    ]
  },
  {
    name: 'Canon-Dslr',
    category: 'Camera',
    price: '100.00 USD',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 2,
    description: 'Professional DSLR camera for stunning photography and videography',
    brand: 'Canon',
    resolution: '24.2 MP',
    rating: 4.5,
    videoResolution: 'Full HD 1080p',
    ratingimg:fourpoint5
    ,
    pur:'35+ purchased last month',
    mrp:'150.00',
    dis:'25%'
    ,
    ati: [
      'High-resolution 24.2 MP sensor for crisp and clear images.',
      'Full HD 1080p video recording for professional videography.',
      'Rated 4.5 stars by satisfied customers.',
      'Ideal for both photography enthusiasts and professionals.',
      'Compact and durable design for portability and longevity.'
    ]
    
  },
  {
    name: 'LipStick-Pink',
    category: 'Cosmetics',
    price: '200.00 USD',
    image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 3,
    description: 'Vibrant pink lipstick for a bold and beautiful look',
    brand: 'CosmeticGlow',
    rating: 5.0,
    type: 'Matte',
    ratingimg:five
    ,
    pur:'100+ purchased last month'
    ,
    mrp:'400.00',
    dis:'50%'
    ,
    ati: [
      'Intensely pigmented for a vibrant and long-lasting color.',
      'Matte finish for a bold and trendy look.',
      'Rated 5.0 stars by satisfied customers.',
      'Ideal for creating a statement lip.',
      'Suitable for various occasions and makeup styles.'
    ]
  },
  {
    name: 'Jumper-Sneakers',
    category: 'Shoe',
    price: '300.00 USD',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D',
    count: 3,
    description: 'Comfortable and stylish sneakers for everyday wear',
    brand: 'JumpStyle',
    rating: 3.5,
    sizeOptions: ['US 7', 'US 8', 'US 9'],
    ratingimg:threepoint5
    ,
    pur:'500+ purchased last month'
    ,
    mrp:'450.00',
    dis:'25%'
    ,
    ati: [
      'Versatile design for casual and athletic wear.',
      'Cushioned insole for added comfort during long hours.',
      'Rated 3.5 stars by satisfied customers.',
      'Available in multiple sizes for a perfect fit.',
      'Durable construction for long-lasting use.'
    ]
  },
  {
    name: 'Dove-FaceWash',
    category: 'Cosmetics',
    price: '400.00 USD',
    image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2R1Y3RzfGVufDB8fDB8fHww',
    count: 3,
    description: 'Gentle face wash for a refreshing and clean face',
    brand: 'Dove',
    rating: 4.0,
    skinType: 'All Skin Types',
    ratingimg:four
    ,
    pur:'400+ purchased last month'
    ,
    mrp:'800.00',
    dis:'50%',
    ati: [
      'Mild formula suitable for all skin types.',
      'Gently cleanses and refreshes the face.',
      'Rated 4.0 stars by satisfied customers.',
      'Ideal for daily skincare routine.',
      'Packed with nourishing ingredients for a healthy complexion.'
    ]
  },
  {
    name: 'WhiteBand-Watch',
    category: 'Watch',
    price: '500.00 USD',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2R1Y3RzfGVufDB8fDB8fHww',
    count: 3,
    description: 'Elegant white band watch for a classy and timeless look',
    brand: 'TimeMaster',
    rating: 4.0,
    waterResistance: '30m',
    ratingimg:four
    ,
    pur:'300+ purchased last month'
    ,
    mrp:'750.00',
    dis:'25%',
    ati: [
      'Classic and timeless design for a sophisticated look.',
      'White band complements various outfits.',
      'Rated 4.0 stars by satisfied customers.',
      'Water-resistant up to 30 meters for everyday use.',
      'Ideal for both casual and formal occasions.'
    ]
  },
  {
    name: 'Grey-RunningShoe',
    category: 'Shoe',
    price: '300.62 USD',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2R1Y3RzfGVufDB8fDB8fHww',
    count: 3,
    description: 'Lightweight and breathable running shoes for active lifestyles',
    brand: 'RunFlex',
    rating: 5.0,
    color: 'Grey/White',
    ratingimg:five
    ,
    pur:'150+ purchased last month'
    ,
    mrp:'601.24',
    dis:'50%',
    ati: [
      'Designed for runners seeking lightweight and breathable shoes.',
      'Highly rated with 5.0 stars by satisfied customers.',
      'Grey/White color combination for a stylish look.',
      'Ideal for various athletic activities and everyday use.',
      'Durable construction for long-lasting performance.'
    ]
  },
  {
    name: 'Apple-Watch',
    category: 'Watch',
    price: '1000.00 USD',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHByb2R1Y3RzfGVufDB8fDB8fHww',
    count: 3,
    description: 'Premium smartwatch by Apple with advanced features and sleek design',
    brand: 'Apple',
    rating: 4.0,
    compatibility: 'iOS and Android',
    ratingimg:four
    ,
    pur:'150+ purchased last month'
    ,
    mrp:'3000.00',
    dis:'75%',
    ati: [
      'Advanced smartwatch with premium features.',
      'Compatible with both iOS and Android devices.',
      'Rated 4.0 stars by satisfied customers.',
      'Sleek design for a modern and stylish look.',
      'Ideal for tracking fitness, receiving notifications, and more.'
    ]
  },
  {
    name: 'CalvinKlein-Perfume',
    category: 'Perfumes',
    price: '370.66 USD',
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHByb2R1Y3RzfGVufDB8fDB8fHww',
    count: 3,
    description: 'Calvin Klein perfume for a captivating and long-lasting fragrance',
    brand: 'Calvin Klein',
    rating: 4.0,
    scent: 'Floral and Woody',
    ratingimg:four
    ,
    pur:'250+ purchased last month'
    ,
    mrp:'741.32',
    dis:'50%',
    ati: [
      'Calvin Klein perfume with a captivating floral and woody scent.',
      'Rated 4.0 stars by satisfied customers.',
      'Ideal for both daytime and evening wear.',
      'Long-lasting fragrance for all-day freshness.',
      'Packaged in an elegant bottle for a luxurious touch.'
    ]
  },
  {
    name: 'Martin-Perfumes',
    category: 'Perfumes',
    price: '400.66 USD',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHByb2R1Y3RzfGVufDB8fDB8fHww',
    count: 3,
    description: 'Martin perfumes with a unique blend of exotic scents',
    brand: 'Martin',
    rating: 4.0,
    scentNotes: ['Amber', 'Vanilla', 'Sandalwood'],
    ratingimg:four
    ,
    pur:'500+ purchased last month'
    ,
    mrp:'601.32',
    dis:'25%',
    ati: [
      'Exotic perfumes with a unique blend of Amber, Vanilla, and Sandalwood.',
      'Rated 4.0 stars by satisfied customers.',
      'Ideal for special occasions and daily wear.',
      'Long-lasting fragrance for a lasting impression.',
      'Elegantly packaged for gifting or personal use.'
    ]
  },
   {
    name: 'DSLR-Lens',
    category: 'Camera',
    price: '350.00 USD',
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHByb2R1Y3RzfGVufDB8fDB8fHww',
    count: 3,
    description: 'High-quality DSLR lens for sharp and clear photography',
    brand: 'LensMaster',
    focalLength: '50mm',
    rating: 4.0,
    aperture: 'f/1.8',
    ratingimg:four
    ,
    pur:'1000+ purchased last month'
    ,
    mrp:'700.00',
    dis:'50%',
    ati: [
      'Professional-grade DSLR lens for exceptional image quality.',
      '50mm focal length for versatile photography options.',
      'Wide aperture of f/1.8 for excellent low-light performance.',
      'Rated 4.0 stars by satisfied customers.',
      'Ideal for both amateur and professional photographers.'
    ]
  },
  {
    name: 'Red Athletic-Shoe',
    category: 'Shoe',
    price: '50.66 USD',
    image: 'https://images.unsplash.com/photo-1609250291996-fdebe6020a8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fHByb2R1Y3RzfGVufDB8fDB8fHww',
    count: 3,
    description: 'Lightweight and durable athletic shoes for sports and workouts',
    brand: 'SportX',
    color: 'Red/Black',
    rating: 5.0,
    sizeOptions: ['US 6', 'US 7', 'US 8'],
    ratingimg:five
    ,
    pur:'450+ purchased last month'
    ,
    mrp:'76.32',
    dis:'25%',
    ati: [
      'Durable and lightweight athletic shoes for sports and workouts.',
      'Vibrant Red/Black color combination for a stylish look.',
      'Rated 5.0 stars by satisfied customers.',
      'Available in multiple sizes for a perfect fit.',
      'Ideal for various physical activities and casual wear.'
    ]
  },
]
 
  const [dcount,setdcount]=useState(0)

   function getcount(e){
       setcount(e)
     
   }
   function dcou(e){
    setdcount(e)
    console.log('oirerejek')

   }
   function getname(e){
       
   
   
     
      if(e!==''){
       
        console.log(e+2)
    
   
        sr1(products.slice(0,6).filter((p)=>p.name.toLowerCase().startsWith(e)))
        sr2(products.slice(6,12).filter((p)=>p.name.toLowerCase().startsWith(e)))

      }
      else{
        sr1(products.slice(0,6))
        sr2(products.slice(6,12))

      }

      

   }
   function buyerprice(e){
    setbuyprice(e)
     
   }
   function buyerdata(e){
    setbuydata(e)

   }
   function usernamef(e){
    setusername(e)

   }
   function productinfos(e){
    setproductinfo(e)

   }
   var [row1,sr1]=useState(products.slice(0,6))
   var [row2,sr2]=useState(products.slice(6,12))
  

  return (
    <>
    
    
   
    <BrowserRouter>
    <Navbar data={count} func={getname} namess={username} dco={dcount}/>
    <Routes>
      <Route path='/app' element={<>
        <div className='s' style={{display:'flex',flexDirection:'row'}}>
    {row1.map((p)=><Products data={p} func={getcount} namefunc={usernamef} pi={productinfos}/>)}
    </div>
    <div className='s' style={{display:'flex',flexDirection:'row'}}>
    {row2.map((p)=><Products data={p} func={getcount} namefunc={usernamef} pi={productinfos}/>)}
    </div></>}></Route>
      <Route path='/cart' element={<Cart func={buyerprice} funce={buyerdata}/>}></Route>
      <Route path='/' element={<Signup/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    
    <Route path='/buy' element={<BuyPage data={buyprice} func={dcou} data2={buydata} />}></Route>
    
     <Route path='/order' element={<Myoder/>}></Route>
     <Route path='/productinfo' element={<ProductInfo data={productinfo}/>}></Route>
    </Routes>
    
    </BrowserRouter>
   
   
 
     
    </>
  )
}

export default App
