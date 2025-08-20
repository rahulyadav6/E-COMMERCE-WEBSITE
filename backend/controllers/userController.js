import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";



const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET);
}



// Route for user login
export const loginUser = async(req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:"User doesn't exists"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success: false, message: "Incorrect password" });
        }
        const token = createToken(user._id);
        res.json({ success:true, token })


    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

// Route for user registration
export const registerUser = async(req,res)=>{
    try {
        const { name, email, password } = req.body;

        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({ success:false, message: "User already exists" })
        }
        
        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({ success:false, message: "Please enter a valid email" })
        }

        if(password.length < 8 ){
            return res.json({ success:false, message: "Please enter a strong password" })
        }

        const salt = await bcrypt.genSalt(10)
        const hasledPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name,
            email,
            password:hasledPassword
        })
        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({success:true, token})


    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

// Route for admin login
export const adminLogin = async(req,res)=>{

}