import mongoose from "mongoose";


const UseSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    savedRecipies: [{type: mongoose.Schema.Types.ObjectId, ref: "recipies"}]
});

export const UserModal = mongoose.model("users", UseSchema)