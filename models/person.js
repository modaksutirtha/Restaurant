const mongoose= require('mongoose');
const bcrypt=require('bcrypt');
const personschema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
})
personschema.pre('save', async function(next){
    const person=this;
    if(!person.isModified('password'))return next();
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedpass=await bcrypt.hash(person.password,salt);
        person.password=hashedpass;
        next();

    }
    catch(err){
        return next(err);
    }
})
personSchema.methods.comparepassword = async function(candidatePassword){
    try{
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}
const person=mongoose.model('person',personschema);
module.exports=person;