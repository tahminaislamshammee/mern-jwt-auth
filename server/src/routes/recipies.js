import express from 'express';
import { RecipiesModal } from '../models/Recipies.js';
import { UserModal } from '../models/Users.js';
import { verifyToken } from './users.js';


const router = express.Router();

router.get("/", async (req, res)=> {
    try {
        const response = await RecipiesModal.find({});
        res.json(response);
    } catch (error) {
        res.json(error);
    }
})

router.post("/", verifyToken, async (req, res)=> {
    const recipe = new RecipiesModal(req.body);
    try {
        const response = await recipe.save();
        res.json(response);
    } catch (error) {
        res.json(error);
    }
})

router.put("/", verifyToken, async (req, res)=> {
    try {
        const recipe = await RecipiesModal.findById(req.body.recipeId)
        const user = await UserModal.findById(req.body.userId)
        user.savedRecipies.push(recipe);
        await user.save();
        res.json({savedRecipies: user.savedRecipies});
    } catch (error) {
        res.json(error);
    }
})

router.get("/savedRecipies/ids/:userId", async (req, res)=> {
    try {
        const user = await UserModal.findById(req.params.userId)
        res.json({savedRecipies: user?.savedRecipies})
    } catch (error) {
        res.json(error);
    }
})

router.get("/savedRecipies/:userId", async (req, res)=> {
    try {
        const user = await UserModal.findById(req.params.userId)

        const savedRecipies = await RecipiesModal.find({_id: {$in: user.savedRecipies}})

        res.json({savedRecipies})
    } catch (error) {
        res.json(error);
    }
})

export {router as recipiesRouter};