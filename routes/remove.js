exports.deleteArticle = (deleteBlog,isverify,usersBlog)=>{
    deleteBlog.delete("/delete/:username/:_id",isverify,async(req,res)=>{
        var query = {username:req.params.username,_id:req.params._id}
        var detail = await usersBlog.find(query)
        // console.log(detail)
        if(detail.length !== 0){
            var data = await usersBlog.findOneAndDelete(query)
            res.send("Element Deleted !")
        }else{
            res.send("Element Not Found !")
        }
    })
}



exports.deleteUser = (deleteuser,isverify,user_detail,usersBlog,jwt,secret_key)=>{
    deleteuser.delete("/delete/:username",isverify,async(req,res)=>{
        var token = req.headers.cookie.slice(4)
        var decode = jwt.verify(token,secret_key)
        var query = {username:req.params.username}
        var detail = await user_detail.find(query)
        var data = await usersBlog.find(query)
        // console.log(detail)

        if (detail.length!==0){
            if (req.params.username!=="mr_akhilesh_kumawat"){
                await user_detail.findOneAndDelete(query)
                if(data.length!==0){
                    await usersBlog.deleteMany(query)
                    if (decode.username !== "mr_akhilesh_kumawat"){
                        // res.clearCookie(token,"/articles")
                        res.clearCookie("jwt","/login")                        
                        res.send("User Data Deleted !")
                    }else{
                        res.send("User Data Deleted !")
                    }
                }else{
                    res.clearCookie("jwt","/login")
                    res.send("User Data Deleted !!")
                }
                
            }else{
                res.send("Cannot delete Admin")
            }
            
        }else{
            res.send("User Data not found !")
        }
    })   
}