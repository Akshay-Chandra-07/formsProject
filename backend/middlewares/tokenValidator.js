const jwt = require('jsonwebtoken');
const tokenValidator = (req,res,next)=>{
    const header = req.headers.Authorization || req.headers.authorization;
    console.log(header);
    
    if(!header){
        // console.log(req.header)
        return res.status(401).json({message:"Access Denied"});
    }
    const token = header.split(' ')[1];
    jwt.verify(token,process.env.JWT_SECRETKEY,(err,decoded)=>{
        if(err){
            return res.status(400).json({msg:"Invalid Token"});
        }
        else{
            console.log("successssssssssssss")
            next();
        }
    });
}

module.exports = tokenValidator;