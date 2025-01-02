const Users = require('../models/users')

exports.users = async (req,res)=>{
    try{
        const users = await Users.query().select('id','name','email','username')
        res.status(200).json(users)
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Error occurred"})
    }
}