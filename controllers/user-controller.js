import User from "../models/User";

export const getAllUsers= async (req, res, next) => {
    let users;
    try{
        users = await User.find();
    }catch(err){
        res.status(500).json({message: err.message});
    }

    if(!users){
        return res.status(404).json({message: "No users found!"});
    }

    return res.status(200).json({users:users});
}

export const signup = async(req, res, next) => {
    const {name, email, password} = req.body;
   
    let existingUser;

    try{
        existingUser = await User.findOne({email});
    }catch(err){
        res.status(500).json({message: err.message});
    }
    
    if(existingUser){
        return res.status(422).json({message: "User already exists!"});
    }

    const user = new User({
        name,
        email,
        password,
        blogs: []
    });
    
    try{
        console.log("user", user);
        await user.save();
    }catch(err){
        console.log(err);
    }

    return res.status(201).json({user: user}); 
}

export const login = async(req, res, next) => {
    const {email, password} = req.body;
   
    let existingUser;

    try{
        existingUser = await User.findOne({email});
    }catch(err){
        res.status(500).json({message: err.message});
    }

    if(!existingUser){
        return res.status(404).json({message: "User does not exist!"});
    }

    if(existingUser.password !== password){
        return res.status(401).json({message: "Invalid credentials!"});
    }

    return res.status(200).json({user: existingUser});
    
}