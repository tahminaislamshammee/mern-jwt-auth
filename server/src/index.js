import express from 'express'; // crete our api
import cors from 'cors'; // set ruls to communicate btwn fe and be
import mongoose from 'mongoose'; //database

const app = express(); //generate version of our api

import {userRouter} from './routes/users.js'
import { recipiesRouter } from './routes/recipies.js';

app.use(express.json());// when data is sent from fe it converts to json 

app.use(cors()); 

app.use("/auth", userRouter);
app.use("/recipies", recipiesRouter);

mongoose.connect("mongodb+srv://tahminaislamshammee:B9FZVbYi60p0wlf7@authentication.91fcfwk.mongodb.net/authentication?retryWrites=true&w=majority")

app.listen(3001, ()=> console.log('server started!'));