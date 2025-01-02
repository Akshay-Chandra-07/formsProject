const Users = require('../models/users')
const bcrypt = require('bcrypt')

exports.getUser = async (req,res)=>{
    try{
        user = await Users.query().select("name","id","email","username").findById(req.params.id)
        console.log(user)
        return res.status(200).json(user)
    }catch(error){
        return res.status(500).json({error:"Error occurred"})
    }
}

exports.updateDetails = async (req,res)=>{
    const {name, email, oldPassword, newPassword} = req.body;
    const availData = {}
    if(name) availData.name = name
    if(email) availData.email = email
    if(oldPassword && newPassword){
        console.log(oldPassword,newPassword)
        getPass = await Users.query().select("password").findById(req.params.id)
        console.log(getPass.password)
        bool = await bcrypt.compare(oldPassword,getPass.password)
        console.log(bool)
        if(!bool){
            return res.status(500).json({msg:"Wrong old Password!"})
        }else{
            newHashPass = await bcrypt.hash(newPassword,10)
            availData.password = newHashPass
            console.log(newHashPass)
        }
    }
    try{
        if(availData.name || availData.email || availData.password){
            console.log(availData)
            newUser = await Users.query().findById(req.params.id).patchAndFetchById(req.params.id,availData)
            return res.status(200).json(newUser)
        }
        console.log("no data")
        return res.status(500).json({msg:"No data to update"})
    }catch(err){
        return res.status(500).json({error:"Error occurred"})
    }
    

}

// exports.updateEmail = async (req,res)=>{
//     try{
//         newUser = await Users.query().findById(req.params.id).patchAndFetchById(req.params.id,{email:req.body.email})
//         return res.status(200).json(newUser)
//     }catch(err){
//         return res.status(500).json({error:"Error occurred"})
//     }
// }

// exports.updatePassword = async (req,res)=>{
//     try{
//         getPass = await Users.query().select("password").findById(req.params.id)
//         bool = await bcrypt.compare(req.body.oldPass,getPass)
//         if(bool){
//             newHashPass = await bcrypt.hash(req.body.newPass,10)
//             newUser = await Users.query().findById(req.params.id).patchAndFetchById(req.params.id,{password:newHashPass})
//         }
//         return res.status(200).json(newUser)
//     }catch(err){
//         return res.status(500).json({error:"Error occurred"})
//     }
// }