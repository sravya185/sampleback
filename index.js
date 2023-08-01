const express=require('express')
const app =express()
const path=require("path")
const hbs=require("hbs")



const collection1=require("./database1")
const collection2=require("./database2")
const templatePath=path.join(__dirname,'../templates')
const publicPath = path.join(__dirname, '../public')
const images=path.join(__dirname,'../images')
app.use(express.json())
app.set("view engine","hbs")
app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))
app.use(express.static(publicPath))
app.use(express.static(images))



app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/index",(req,res)=>{
    res.render("index")
})
app.get("/wardendisplay.",(req,res)=>{
    res.render("wardendisplay")
})
app.get("/hostels",(req,res)=>{
    res.render("hostels")
})
app.get("/warden",(req,res)=>{
    res.render("warden")
})
app.get("/registrationform",(req,res)=>{
    res.render("registrationform")
})
app.get("/contact",(req,res)=>{
    res.render("contact")
})
// app.get("/wardenlogin",(req,res)=>{
//     res.render("wardenlogin")
// })
// app.get("/wardendisplay",(req,res)=>{
//     res.render("wardendisplay")
// })


app.post("/registrationform",async(req,res)=>
{
    const data={
        hno:req.body.hno,
        rank:req.body.rank,
        sname:req.body.sname,
        mail:req.body.mail,
        spno:req.body.spno,
        aano:req.body.aano,
        branch:req.body.branch,
        hostel:req.body.hostel,
        roomno:req.body.roomno,
        bed:req.body.bed,
        fathname:req.body.fathname,
        fphno:req.body.fphno
    }
    const check = await collection1.findOne({aano:req.body.aano})
    if(check)
    {
        res.send("already booked")
    }
       else{
        await collection1.insertMany([data])
        res.send("success")
       }
     
})


app.post("/warden",async(req,res)=>
{
    try{
        const check = await collection2.findOne({username:req.body.username})
    if(check.password === req.body.password)
    {
        res.render("wardendisplay")
    }
    else{
        // res.status(201).json({
        //     message: "User registered successfully",
        //   });
   
        res.send("wrong password")
    }
    }
    catch(err)
    {
        res.send("wrong details")
    }

})

app.listen(5000,()=>
{
    console.log("server started")
})