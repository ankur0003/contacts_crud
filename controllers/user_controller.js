const asyncHandler = require("express-async-handler")

const bcrypt = require("bcrypt")
const User = require("../models/user_model")
const jwt = require("jsonwebtoken")
const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password} = req.body

    if(!username || !email || !password){
        res.status(400)
        throw new Error("All Fields are Manadatory")
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User Already Registered")
    }
    //Hash Password
    const hashPass= await bcrypt.hash(password,10)
    console.log("Hash Password",hashPass)
    const user = await User.create({username,email,password:hashPass})

    console.log("User created succesfully",user)
    if(user){
        res.status(201).json({_id:user.id,email:user.email})
    }else{
        res.status(400)
        throw new Error("Inavlid request Error occuredd")
    }
    res.json({message:"Registering the user"})
}
)

const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("Validation Invalid Request")
    }
    const user = await User.findOne({email})
    if(user && await (bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign(
            {
                user:{
                    username:user.username,email:user.email,id:user.id
                },
                
            },process.env.ACCESS_TOKEN_SECRET  ,
            {expiresIn:"15m"}
        )
        // compare password
        res.status(200).json({
            "access_token":accessToken
        })
    }else{
        res.status(401)
        throw new Error("Invalid Credentials")
    }
}
)

//@desc Current User
//@route POST /api/contacts/current
//@access private
const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user)
})
module.exports = {registerUser,loginUser,currentUser}