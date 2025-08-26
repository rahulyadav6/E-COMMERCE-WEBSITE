import jwt from 'jsonwebtoken';

const authUser = async(req,res,next)=>{
    console.log("authUser middleware called");
    console.log("Headers received:", req.headers);
    
    const {token} = req.headers;
    if(!token){
        console.log("No token provided");
        return res.json({ success: false, message: 'Not Authorized Login Please'})
    }
    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log("Token decoded successfully:", token_decode);
        req.body.userId = token_decode.id;
        console.log("userId set in req.body:", req.body.userId);
        next();
    }catch(error){
        console.log("Token verification error:", error);
        res.json({success:false, message: error.message});
    }
}

export default authUser;