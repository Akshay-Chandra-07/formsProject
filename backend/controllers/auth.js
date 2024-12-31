const Users = require('../models/users')
const bcrypt = require('bcrypt')

exports.register = async (req,res)=>{
    const {name,email,username,password} = req.body;
    console.log(name)
    console.log(email)
    console.log(username)
    console.log(password)
    try{
        console.log(1)
        bool = await Users.query().findOne({username})
        console.log(2);
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
    const {username,password} = req.body
    try{
        bool = await Users.query().findOne({username})
        if(bool){
            pass = await bcrypt.compare(password,bool.password)
            // console.log(pass)
            if(pass){
                return res.status(200).json({msg:"Logged in!"})
            }
            return res.status(200).json({error:"Invalid Password!"})
        }
        return res.status(200).json({error:"Invalid Credentials!"})
    }catch{
        return res.status(500).json({error:"Error Occurred"})
    }
}