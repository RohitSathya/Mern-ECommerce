const express=require('express')
const cors=require('cors')
const app=express()
const mongoose=require('mongoose')
const router=require('./Routes/Routes')
app.use(express.json())
app.use(cors())

app.use('/product',router)

mongoose.set("strictQuery",false)
                           
mongoose.connect('mongodb+srv://admin:12345@royoapi.3qmdrjq.mongodb.net/ecomeerce?retryWrites=true&w=majority').then(()=>{
    console.log('database connected')
  app.listen(8080,()=>console.log('running'))
 
})

