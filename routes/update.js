exports.updateBlog = (update,isverify,usersBlog)=>{
    update.put("/update/:username/:_id",isverify,async(req,res)=>{
        var query = {username:req.params.username,_id:req.params._id}
        var detail = await usersBlog.find(query)
        var datetime = new Date();
        var date = datetime.toISOString().slice(0,10);
           
        if(detail.length !== 0){
            var lastModified = {$set:{updated_At:date}}
            await usersBlog.findOneAndUpdate(query,req.body)
            await usersBlog.findOneAndUpdate(query,lastModified)
            res.send("Element Updated !")
        }else{
            res.send({Error:"Blog is not Found !"})
        }

    })
}


exports.updateProfile = (profileUpdate,isverify,user_detail)=>{
    profileUpdate.put("/update/:username/",isverify,async(req,res)=>{
        var query = {username:req.params.username}
        var detail = await user_detail.find(query)
        if (detail.length !== 0){
            var data = user_detail.findOneAndUpdate(query,req.body)
            res.send("Profile Updated!")
        }else{
            res.send("Profile Not Found !")
        }
        
    })
}