const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/hostelregistration1")
.then(()=>{
    console.log("mongo connected")
})
.catch((err)=>{
    console.log(err)
})
const wardenSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})
const collection2=new mongoose.model("wardenlogindata",wardenSchema)
module.exports=collection2