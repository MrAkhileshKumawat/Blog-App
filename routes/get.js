exports.getOwnOrAllProfile = (profile,user_detail,jwt,secret_key)=>{
    profile.get("/profile",async (req,res)=>{
        if (req.headers.cookie !== undefined && req.headers.cookie !== ""){
            var token = req.headers.cookie.slice(4);
            jwt.verify(token, secret_key ,async (err, decode) =>{
                var data =await user_detail.find({username:decode.username})
                if (decode.username == "mr_akhilesh_kumawat"){
                    var data = user_detail.find({}).then((data)=>{
                        res.send(data)
                    })
                }else if(decode.username != undefined && data.length!==0){
                        var data = user_detail.find({}).select({password:0})
                        .then(async(data)=>{
                            data = await data.find(data=>data.username==decode.username)
                            res.send(data)
                        })
                    
                }else{
                    res.send({"Error": "Please login..."})
                }
            })
        }else{
            res.send({"Error": "Please login..."})
        }
    })  
}



exports.get_profile = (profilee,user_detail,jwt,secret_key)=>{
    profilee.get("/profile/:username",async (req,res)=>{
        if (req.headers.cookie !== undefined && req.headers.cookie !== ""){
            var token = req.headers.cookie.slice(4);
            jwt.verify(token, secret_key ,async (err, decoded_data) =>{
                if (decoded_data.username == "mr_akhilesh_kumawat"){
                    var data = await user_detail.find({username:req.params.username})
                    if (data.length!==0){
                        res.send(data)
                    }else{
                        res.send("User not found")
                    }
                }else{
                    res.send("You are not an Admin")
                }
            })
        }else{
            res.send({"Error": "Please login..."})
        }
    })  
}


exports.get_articles = (articles,usersBlog,jwt,secret_key,user_detail)=>{
    articles.get("/articles",async(req,res)=>{
        // console.log(req.headers.cookie)
        if (req.headers.cookie !== undefined && req.headers.cookie !== ""){
            var token = req.headers.cookie.slice(4);
            jwt.verify(token, secret_key ,async (err, decoded_data) =>{
                // console.log(decoded_data)
                var user= await user_detail.find({username:decoded_data.username})
                // console.log(user)
                if (!err){
                    if(user.length !== 0){
                        var data = await usersBlog.find({})
                        if(data.length !==0){
                            res.send(data)
                        }else{
                            res.send("Blog Not Found")
                        }
                    }else{
                        res.send({Error:"Please Login"})
                    }
                    
                }else{
                    res.send({"Error": "Please login..."})
                }
            })
        }else{
            res.send({"Error": "Please login..."})
        }
    })
}

exports.get_article = (article,usersBlog,jwt,secret_key,user_detail)=>{
    article.get("/articles/:username",async(req,res)=>{
        var user = await user_detail.find({username:req.params.username})
        if (user.length !== 0){

            if (req.headers.cookie !== undefined && req.headers.cookie !== ""){
                var token = req.headers.cookie.slice(4);
                jwt.verify(token, secret_key ,async (err, decoded_data) =>{
                    if (!err){
                        var data = await usersBlog.find({username:req.params.username})
                        if(data.length !==0){
                            res.send(data)
                        }else{
                            res.send(`${req.params.username} didn't post any article`)
                        }
                    }else{
                        res.send({"Error": "Please login..."})
                    }
                })
            }else{
                res.send({"Error": "Please login..."})
            }
        }else{
            res.send({Error:"User Not Found"})
        }
        
    })
}


