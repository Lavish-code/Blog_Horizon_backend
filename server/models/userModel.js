const{Schema,model}=require('mongoose')

const userSchema= new Schema({
    name:{type:String,requried:true},
    email:{type:String,requried:true},
    password:{type:String,requried:true},
    avatar:{type:String},
    posts:{type:Number,default:0}
})

module.exports=model('User',userSchema)
