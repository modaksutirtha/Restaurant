const express=require("express");
const router=express.Router();
const person= require('../models/person');
//..........................................................................................................
router.post('/',async(req,res)=>{

    try{
        const data= req.body;
        const newperson=new person(data);
        const response= await newperson.save();
        console.log('data saved');
        res.status(200).json(response);

    }
    catch(err){
        console.log('the eroor is:',err);
        res.status(500).json({error:'internel server error'});

    }
})
//............................................................................................................
router.get('/',async(req,res)=>{
    try{
        const data= await person.find();
        console.log('person data fetched');
        res.status(200).json(data);

    }
    catch(err){
        console.log('the eroor is:',err);
        res.status(500).json({error:'internel server error in person'});

    }
})
router.get('/:worktype',async(req,res)=>{

    try{
        const worktype=req.params.worktype;
        if(worktype=='chef'||worktype=='manager' || worktype=='waiter' ){

            const response=await person.find({work:worktype});
            console.log("particular data fetched");
            res.status(200).json(response);
        }
        else{
            res.status(500).json('invalid ask');
        }

    }
    catch(err){
        console.log('the eroor is:',err);
        res.status(500).json({error:'particular ask internel server error'});

    }
})
//.........................................................................................................
router.put('/:id',async(req,res)=>{
    try{
        const personid= req.params.id;
        const updatedinfo=req.body;
        const response=await person.findByIdAndUpdate(personid,updatedinfo,{
            new:true,
            runvalidators:true
        })
        console.log('updated info');
        res.status(200).json(response);
        if(!response){
            return res.status(404)('person not found');
        }

    }
    catch(err){
        console.log('the eroor is:',err);
        res.status(500).json({error:'update info internel server error'});

    }
})
//.....................................................................................

router.delete('/:id',async(req,res)=>{

    try{
        const personid=req.params.id;
        const response=person.findByIdAndDelete(personid);
        if(!response)return res.status(404).json('error:person not found');
        console.log('person is deleted');
        res.status(200).json('The person is deleted');

    }
    catch(err){
        console.log('the eroor is:',err);
        res.status(500).json({error:'delete info internel server error'});

    }
})
module.exports=router;