const Users = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config({path:'../.env'})

exports.register = async (req,res)=>{
    const {name,email,username,password} = req.body;
    console.log(name)
    console.log(email)
    console.log(username)
    console.log(password)
    try{
        bool = await Users.query().findOne({username})
        if(bool){
            return res.status(200).json({msg:"Username taken!"})
        }
        hashPass = await bcrypt.hash(password,10)
        console.log(hashPass)
        newUser = await Users.query().insert({name,email,username,password: hashPass})
        res.status(200).json({msg:"User created"})
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Error occurred"})
    }
}

exports.login = async (req,res)=>{
    console.log("Login")
    const {username,password} = req.body
    try{
        bool = await Users.query().findOne({username})
        if(bool){
            pass = await bcrypt.compare(password,bool.password)
            // console.log(pass)
            if(pass){
                const tokenKey = jwt.sign({id:bool.id},process.env.JWT_SECRETKEY)
                return res.status(200).json({msg:"Logged in!",token : tokenKey,id:bool.id})
            }
            return res.status(200).json({error:"Invalid Password!"})
        }
        return res.status(200).json({error:"Invalid Credentials!"})
    }catch{
        return res.status(500).json({error:"Error Occurred"})
    }
}