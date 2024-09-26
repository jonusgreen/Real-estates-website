const authcontroller = require('express').Router()
const User = require('../models/User')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

//register
authcontroller.post('/register', async(req,res) => {
  try {
    const isExisting = await User.findOne({email: req.body.email})
     if(isExisting){
        throw new Error("Email Already registered" )
     }
     const hashedpassword = await bcrypt.hash(req.body.password,10)

     const newUser = await User.create({...req.body, password: hashedpassword})

     const {password, ...others} = newUser._doc
     const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET,{expiresIn: '4h'})
     return res.status(201).json({others, token})
  } catch (error) {
     return res.status(500).json(error.message)
  } 

})
//login 
authcontroller.post('/login', async(req,res) => {
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            throw error("Wrong credentials")
        }
        const comparepass = await bcrypt.compare(req.body.password, user.password)
        if(!comparepass){
            throw new Error("wrong credentials")
        }
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'4h'})
        const {password, ...others} = user._doc
        return res.status(200).json({others,token})

    } catch (error) {
        return res.status(500).json(error.message) 
    }
})
module.exports = authcontroller