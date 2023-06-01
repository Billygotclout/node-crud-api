const asyncHandler = require("express-async-handler");
const Crud = require("../models/crudModel");
const { default: mongoose } = require("mongoose");


const read = asyncHandler(async (req, res) => {
  const user = await Crud.find({user_id:req.user.id});
  res.status(200).json({ message: "Success", data: user });
});
const create = asyncHandler(async (req, res) => {
    console.log("Your req bidy is", req.body);
    try {
        const { name, phone } = req.body;
        if (!name || !phone) {
          res.status(400);
          throw new Error("All fields are required");
        }
        const user = await Crud.create({
            user_id: req.user.id,
          name,
          phone,
    });
      
        res.status(201).json({ message: "User Successfully created", data: user });
    } catch (error) {
        console.log(error);
    }
 
});
const readId = async(req, res) => {
try {
    const user= await Crud.findById(req.params.id)
    if (!user) {
        res.status(404)
        throw new Error("User not found");
    }
  res.status(200).json({ message: "Success", data: user });
} catch (error) {
    console.log(error);
}
    
};
const update = async(req, res) => {
    const user = await Crud.findById(req.params.id)
    if(!user){
        res.status(404)
        throw new Error("User not found")
    }
    if (user.user_id.toString()!== req.user.id) {
        res.status(403);
        throw new Error("User no permission")
    }
    const update = await Crud.findByIdAndUpdate(req.params.id, req.body,{new:true})
  res.status(200).json({ message: "User Updated successfully!", data:update });
};
const deletei = async(req, res) => {
    const user = await Crud.findById(req.params.id)
    if(!user){
        res.status(404)
        throw new Error("User not found")
    }
    if (user.user_id.toString()!== req.user.id) {
        res.status(403);
        throw new Error("User no permission")
    }
    await Crud.deleteOne({_id: req.params.id})
  res.status(200).json({ message: "User Deleted Successfully!", data: user });
};

module.exports = { read, readId, create, update, deletei };
