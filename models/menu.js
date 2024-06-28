const mongoose= require('mongoose');
const newitemschema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{

        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['sweet','sour','spicy'],
        required:true
    },
    isdrink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default:[]
    },
    numsale:{
        type:Number,
        default:0
    }
})

const menuitem=mongoose.model('menuitem',newitemschema);
module.exports=menuitem;