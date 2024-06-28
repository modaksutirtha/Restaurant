const express= require("express");
const app= express();
const bodyparser=require('body-parser');
// const passport=require('passport');
// const localstrategy=require('passport-local').Strategy;
// const person=require('./models/person');

const passport=require('./auth');
app.use(bodyparser.json());
require('dotenv').config();


///////////////////////////////////////////uWeQMrmq7craBH3s
const port=process.env.port || 3000;
const db= require('./db');
const middleauthen=passport.authenticate('local',{session:false});
app.get("/",middleauthen ,(req,res)=>{
    res.send("hi hello how can i help you");
})

//........................................................................................................
const logrequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}]Request is to : ${req.originalUrl}`);
    next();
}
app.use(logrequest);
//.........................................................................................................



app.use(passport.initialize());
//........................................................................................................


const personroutes=require('./Routes/personroute');
app.use('/person',middleauthen,personroutes);
const menuroutes=require('./Routes/menuroutes');
app.use('/menu',middleauthen,menuroutes);



app.listen(port, ()=>{console.log("yes 2000")});
