const property = require('../models/Property')
const propertycontroller = require('express').Router()
const verifyToken = require("../middlewares/verifyToken")
const { get } = require('mongoose')
//  route using Express
const express = require('express');
const router = express.Router();



//get all
propertycontroller.get('/getAll', async(req,res)  => {
    try {
       const properties = await property.find({}) 
       return res.status(200).json(properties)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

/
// Define a route for finding featured properties
router.get('/find/featured', async (req, res) => {
  try {
    const featuredProperties = await property.find({ featured: true });
    res.status(200).json(featuredProperties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

 
//get all from a specify type
propertycontroller.get('/find',async (req,res) => {
const type = req.query
//{type:'beach'}
    try {
      if (type){
        const properties = await property.find(type).populate('currentOwner','-password')
        return res.status(200).json(properties)
        }
        else{
            return res.status(500).json({msg: "No such type"})
        }
      
    } catch (error) {
    return res.status(500).json(error.message) 
    }
})

// get counts of types ->ex (beach:2, village:5, mountain:12)

propertycontroller .get('/find/type'), async(req,res) => {

    try {
        const beachType = await property.countDocuments({type: 'beach'})
        const mountainType = await property.countDocuments({type: 'mountain'})
        const villageType = await property.countDocuments({type: 'village'})
        returnres.status(200).json({
            beach: beachType,
            mountain: mountainType,
            village: villageType
        })


    } catch (error) {
        
        return res.status(500).json(error.message) 
    }
}

//get individual property
propertycontroller.get("/find/:id"), async(req,res) => {
   try {
    const Property = await property.find(req,params.id).populate("currentOwner", '-password')
    if(!property){
        throw new Error("No such property with this id")
    }
    else{
        return req.status(200).json(property)
    }
   } catch (error) {
    return res.status(500).json(error.message) 
   }
}

// create a property
propertycontroller.post('/', verifyToken,async(req, res) => {
    try {
       const newproperty  = await property.create({...req.body, currentowner: req.user.id})
       return res.status(201).json(newproperty)

    } catch (error) {
        return res.status(500).json(error.message) 
    }
}
)

//update property
propertycontroller.put("/:id", verifyToken, async(req, res) => {
    try {
        const property = await property.findById(req.params.id)
        console.log(property.currentOwner, req.user.id)
        if(property.currentOwner.toString() !== req.user.id){
            throw new Error ("you are not allowed to update other ppeople properties")
        }
        else{
            const updateproperty = await property.findIdAndUpdate(
                req.params.id,
                {$set:req.body},
                {new: true}
            )
            return res.status(200).json(updateproperty)
        }
    } catch (error) {
        return res.status(500).json(error.message) 
    }
})

//delete property
propertycontroller.delete("/:id", verifyToken, async(req, res) => {
    try {
        const property = await property.findById(req.params.id)
        if(property.currentowner.toString() !==req.user.id){
            throw new Error ("you are not allowed to delete other people's properties")

        }
        else{
            await property.delete()
            return res.status(200).json({msg: "successfully deleted"})
        }
            
    } catch (error) {
        return res.status(500).json(error.message)
    }
})
    module.exports = propertycontroller