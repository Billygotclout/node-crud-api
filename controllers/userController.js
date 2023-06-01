const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const register = async(req,res)=>{
    console.log(req.body);
    const {username, password}=req.body;
    
    if (!username || !password) {
        res.status(400);
        throw new Error("All fields are required");
      }

    const userAvailable= await User.findOne({username})
    if (userAvailable) {
        res.status(400);
        throw new Error("User available");
    }
    const hashpassword = await bcrypt.hash(password,10)
    
    const user = await User.create({
        username,
        password: hashpassword
    })
    res.status(201).json({message: "User successfully registered", data: user})
}
const login =async (req,res)=>{
    const {username, password}=req.body;
    if (!username || !password) {
        res.status(400);
        throw new Error("All fields are required");
      }
      const user = await User.findOne({username})

    if (username && (bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign({
        user:{
            username: user.username,
            password: user.password,
            id: user.id
        }
    }, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"5m"})
    res.status(200).json({message:"User Logged Successfully", token:accessToken, data:user})
      }else{
        res.status(400);
        throw new Error("Username or Password is required");
      }

 
}
const current = async(req,res)=>{
const user =req.user;
res.status(200).json({message:"User found Successfully",  data:user})

}

module.exports ={register, current, login}