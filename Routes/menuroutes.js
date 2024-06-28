const express= require("express");
const router=express.Router();
const newitem= require('../models/menu');

router.get('/',async(req,res)=>{
    try{
        const data= await newitem.find();
        console.log('item data fetched');
        res.status(200).json(data);

    }
    catch(err){
        console.log('the eroor is:',err);
        res.status(500).json({error:'internel server error in menu'});

    }
})
router.get('/:itemss',async(req,res)=>{
    try{
        const items= req.params.itemss;

        if(items=='sweet'|| items=='sour'|| items=='spicy'){
            const response= await newitem.find({taste:items});
            console.log("menu particular data fetched");
            res.status(200).json(response);
        }
        else{
            //console.log('wrong ask');
            res.status(500).json('cant fetch this food');
        }
        

    }
    catch(err){
        console.log('the eroor is:',err);
        res.status(500).json({error:'internel server error in menu ask'});


    }
})
router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newit=new newitem(data);
        const response= await newit.save();
        console.log('menu data saved');
        res.status(200).json(response);

    }
    catch(err){
        console.log('the eroor is:',err);
        res.status(500).json({error:'menu internel server error'});

    }
})

module.exports=router;