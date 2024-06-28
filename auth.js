const passport=require('passport');
const localstrategy=require('passport-local').Strategy;
const person=require('./models/person');


passport.use(new localstrategy(async(username,password,done)=>{
    try{
        console.log('Received credential:',username,password);
        const user=await person.findOne({username:username});
        if(!user)return done(null,false,{message:'INCORRECT USERNAME'});
        const passmatch=user.password===password?true:false;
        if(passmatch)return done(null,user,{message:'succesfully entered'});
        else return done(null,false,{message:'INCORRECT PASSWORD'});

    }
    catch(err){
        return done(err);

    }
}))

module.exports=passport;