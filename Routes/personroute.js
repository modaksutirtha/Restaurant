const express=require("express");
const router=express.Router();
const person= require('../models/person');
const {jwtauthmiddleware,generatetoken}=require('../jwt');
//..........................................................................................................
router.post('/signup',async(req,res)=>{

    try{
        const data= req.body;
        const newperson=new person(data);
        const response= await newperson.save();
        console.log('data saved');

        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        const token = generatetoken(payload);
        console.log("Token is : ", token);

        res.status(200).json({response: response, token: token});

    }
    catch(err){
        console.log('the eroor is:',err);
        res.status(500).json({error:'internel server error'});

    }
})


router.post('/login',async(req,res)=>{

    try{
        const{username,password}=req.body;
        const user=await person.findOne({username:username});
        if(!user || !(await user.comparepassword(password)))
            return res.status(401).json({error:"invalid"});
        const payload={id:user.id,
                       username:user.username
        }
        const token=generatetoken(payload);
        res.json({token});

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

router.get('/profile', jwtauthmiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error getting profile' });
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