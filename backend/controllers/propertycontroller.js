const property = require('../models/Property')
const propertycontroller = require('express').Router()
const verifyToken = require("../middlewares/verifyToken")
const { get } = require('mongoose')


//get all
propertycontroller.get('/getAll', async(req,res)  => {
    try {
       const properties = await property.find({}) 
       return res.status(200).json(properties)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

//get featured
propertycontroller = get('/find/featured', async(req, res) => {
    try {
        const featuredproperties = await property.find({featured: true}).populate('currentOwner', '-password')

        return res.status(200).json(featuredproperties) 
    } catch (error) {
      return res.status(500).json(error.message)  
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
propertycontroller.get("/find/id"), async(req,res) => {
    const Property = await property.find(req,params.id).populate("currentOwner", '-password')
    if(!property){
        throw new Error("No such property with this id")
    }
}