import userModel from "../models/userModel.js";

// add product to user cart
const addToCart = async(req,res)=>{

    const { userId, itemId, size } = req.body;
        console.log("Extracted values:", { userId, itemId, size });

        if (!userId || !itemId || !size) {
            console.log("Missing fields validation failed");
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
    try {
        const { userId, itemId, size  } = req.body;

        if (!userId || !itemId || !size) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
            } else {
            cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        
        await userModel.findByIdAndUpdate(userId, {cartData})
        
        res.json({success:true, message: "Added to Cart"});
        
    } catch (error) {
        console.log("testing error");
        console.log(error);
        res.json({ success:false, message: error.message });
    }
}


// Update product to user cart
const updateCart = async(req,res)=>{
    try {
        const { userId, itemId, size, quantity } =  req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({success:true, message: "Cart Updated"});
    } catch (error) {
        console.log(error);
        res.json({ success:false, message: error.message });
    }
}


// get user cart data
const getUserCart = async(req,res)=>{
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData})
    } catch (error) {
        console.log(error);
        res.json({ success:false, message: error.message });
    }
}

export { addToCart, updateCart, getUserCart }