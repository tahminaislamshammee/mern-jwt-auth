import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModal } from '../models/Users.js';


const router = express.Router();

router.post("/register", async (req, res)=>{
    const {username, password} = req.body;

    const user = await UserModal.findOne({username}) //checking if we have the user on our database

    if(user) {
        return res.json({message: "user already exists!"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModal({username, password:hashedPassword});
    await newUser.save();

    res.json({message: 'user registered successfully!'});
});

router.post("/login", async(req, res)=>{
    const {username, password} = req.body;

    const user = await UserModal.findOne({username});

    if(!user) {
        return res.json({message: 'User does not exixts'});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        res.json({message: 'usename or password is not valid.'});
    }

     const token = jwt.sign({id: user._id}, 'secret');
     res.json({token, userId: user._id})

});


export {router as userRouter};


export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, 'secret', (err)=>{
            if(err) return res.sendStatus(403);
            next();
        })
    }else {
        res.sendStatus(401);
    }
}