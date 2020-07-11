
module.exports = (login,mongoose,jwt,secret_key,user_detail)=>{
    login.post("/login", async (req , res)=>{
        const data = await user_detail.find({})
        const user = data.find(data=>data.username==req.body.username)
        // console.log(user)
        if (user==null){
            // res.clearCookie("/login")
            res.status(400).send("Cannot found user")
        }else if (req.body.username==user.username && req.body.password==user.password){
            const token = await jwt.sign({"username":user.username},secret_key,{expiresIn:"12h"})
            
            res.cookie("jwt", token)
            res.send("Login success")
                
        }else{
            res.send("Invalid Password")
        }
            
        })
    }
