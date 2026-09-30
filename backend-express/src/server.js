const express = require('express');
const app = express()
const cookieparser=require('cookie-parser')
app.use(cookieparser())
//sepecify the foramt wiill be in json
app.use(express.json())
app.use(express.static('public'))
const port = 3000

//connect the mongo db databae
const mongoose = require('mongoose')

//for using of token
const jwt = require('jsonwebtoken')
require('dotenv').config()


//importing user schema
const User= require('./models/User')
const authenticateToken = require('./middleware/authenticateToken')
//make a route
app.post('/create/user',async(req,res,next)=>{
try{
//create a user
const user=await User.create(req.body);//save user in database
res.status(201).json({
  "sucess":true,
  data:user
})

}
catch(error)
{
res.status(400).json({
  "sucess":false,
  "error":error.message
})
}

})

//login api
app.post('/login',async(req,res,next)=>{
try {
  console.log("login api called")
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required'
    })
  }

  const user = await User.findOne({ email })

  if (!user || user.password !== password) {
    return res.status(401).json({
      message: 'Invalid email or password'
    })
  }
//issue token by backend
  const token = jwt.sign(
    { userId: user._id.toString(), email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
//save the token in cookie in forntend
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000
  })

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      age: user.age
    }
  })
} catch (error) {
  res.status(500).json({
    "message":error.message
  })
}


})

app.get('/me', authenticateToken, async (req, res) => {
  const user = await User.findById(req.auth.userId).select('-password')

  if (!user) {
    return res.status(401).json({
      message: 'User no longer exists'
    })
  }

  res.status(200).json({
    success: true,
    user
  })
})

//read 
app.get('/read/user',async(req,res,next)=>{
try{
//read a user
const user=await User.find();//find all user in database
res.status(201).json({
  "sucess":true,
  data:user
})

}
catch(error)
{
res.status(400).json({
  "sucess":false,
  "error":error.message
})
}

})
//delete
app.delete('/delete/user',async(req,res,next)=>{
try{
//password check
//get password
const password=req.query.password;
//get the requesting users information
const myuser=await User.findById(req.query.id)

if (myuser.password===password)
{
  console.log("passowrd matched")
  //perform delete operations
  const user=await User.findByIdAndDelete(req.query.id);//find all user in database
res.status(201).json({
  "sucess":true,
  data:user
})
  
}
else{
  console.log("passowrd not matched")
  return res.status(403).json({
    "message":"password not matched"
  })
}




}
catch(error)
{
res.status(400).json({
  "sucess":false,
  "error":error.message
})
}

})


//connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("mongo db database connected sucessfully")
  }
  catch (error) {
    console.error("error while connecting", error)
    process.exit(1);
  }

}



connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
