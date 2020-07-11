module.exports = (signup,mongoose,user_detail)=>{

    signup.post("/signup",async (req,res)=>{
        let data= await user_detail.find({})
        const user = await data.find(data=>data.username==req.body.username)
        
        if (user == undefined){
            let user_info = new user_detail(req.body)
            try {
                var result = await user_info.save();
            } catch (error) {
                res.send("Fill all the details with proper schema")
                
            }
            res.send(result)
        }else{
            res.send("user already exists")
        }

    })
}






