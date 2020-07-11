const mongoose = require("mongoose");

const db_url = process.env.DB_URL;
console.log(db_url)

const uat = {useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false}
/// connection code 

mongoose.connect(db_url ,uat,(err , link)=>{
    if (err) throw err;
    console.log("DB connect success....")
})

