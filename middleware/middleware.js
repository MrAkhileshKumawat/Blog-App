var jwt = require("jsonwebtoken")
var secret_key = process.env.SECRET_KEY

function isverify(req,res,next){
    var token = (req.headers.cookie)
    // console.log(token)
    if (token !== undefined ){
        var token = token.slice(4)
        
        var decode_username = jwt.verify(token,secret_key)

        var username=decode_username.username

        if (username == (req.params.username ) || username=="mr_akhilesh_kumawat"){
            // console.log("validate")
            next();
        }else{res.send({"Authentication Failed":"You are not admin"})}

    }else{res.send({Error:"Login Please"})}
    
    
}

module.exports = isverify;

