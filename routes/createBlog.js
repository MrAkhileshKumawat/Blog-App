module.exports = (create,mongoose,jwt,secret_key,usersBlog,user_detail)=>{
    
    create.post("/createArticle",async (req,res)=>{
        var token = (req.headers.cookie)
        if (token !== undefined){
            var decode = jwt.verify(token.slice(4),secret_key)
            var user = await user_detail.find({username:decode.username})
            var blog = await usersBlog.find({})
            // console.log(blog.length)
            var data =new usersBlog({
                username:decode.username,
                title:req.body.title,
                description:req.body.description
            })
            if (data.title !== (undefined || null) && data.description !==(undefined || null )){
                data.save((err)=>{
                    if (err){
                        res.send(err)
                    }else{
                        res.send(data)
        
                    }   
                });
                
            }else{
                res.send("title and description are required")
            }  

        }else{
            res.send("Please Login")
        }
        
        
    })
}
