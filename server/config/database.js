const mongoose= require("mongoose")


require("dotenv").config();

exports.connectDb= ()=>{
    mongoose.connect(process.env.MONGO_DB,{
        useNewUrlParser:true,
        useUnifiedTopology:true

    })
    .then(()=>{ console.log("Db connected Successfully")})
    .catch((err)=>{
        console.log("connection ISSUES")
        console.error(err);
        process.exit(1)
    })
}