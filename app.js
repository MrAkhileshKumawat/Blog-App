require("dotenv").config();

const express = require("express")

const jwt = require("jsonwebtoken")

const cookieParser = require("cookie-parser")

const  app = express()

const router = express.Router();

const mongoose = require("./model/database")

const user_detail = require("./model/model").user_detail

const usersBlog = require("./model/model").usersBlog
// console.log(usersBlog)

const secret_key = process.env.SECRET_KEY

var  isverify = require("./middleware/middleware")
// console.log(isverify)


app.use(express.json())


app.get("/",(req,res)=>{
    res.send({Note:"Use Postman For Testing !"})
})

/// user Signup
const signup = express.Router();
app.use("/",signup);
require("./routes/signup")(signup,mongoose,user_detail);

/// user Login
const login = express.Router();
app.use("/",login);
require("./routes/login")(login,mongoose,jwt,secret_key,user_detail);



/// For post the blog 
const create = express.Router();
app.use("/articles",create);
require("./routes/createBlog")(create,mongoose,jwt,secret_key,usersBlog,user_detail);

/// For Update the Blog
const update = express.Router();
app.use("/articles",update);
require("./routes/update").updateBlog(update,isverify,usersBlog);

/// For Update the profile
const profileUpdate = express.Router();
app.use("/profile",profileUpdate);
require("./routes/update").updateProfile(profileUpdate,isverify,user_detail);

/// For delete the blog
const deleteBlog = express.Router();
app.use("/articles",deleteBlog);
require("./routes/remove").deleteArticle(deleteBlog,isverify,usersBlog);

/// For delete the user
const deleteuser = express.Router();
app.use("/profile",deleteuser);
require("./routes/remove").deleteUser(deleteuser,isverify,user_detail,usersBlog,jwt,secret_key);

/// user can see his own profile and admin can see all users profile
const profile = express.Router();
app.use("/",profile);
require("./routes/get").getOwnOrAllProfile(profile,user_detail,jwt,secret_key);

/// Admin can see perticular users profile by their username
const profilee = express.Router();
app.use("/",profilee);
require("./routes/get").get_profile(profilee,user_detail,jwt,secret_key);

/// get all articles
const articles = express.Router();
app.use("/",articles);
require("./routes/get").get_articles(articles,usersBlog,jwt,secret_key,user_detail);

/// articles by their username
const article = express.Router();
app.use("/",article);
require("./routes/get").get_article(article,usersBlog,jwt,secret_key,user_detail);


app.use((req,res,next)=>{
    var error = new Error("Not found")
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=>{
    error.status = (error.status || 500 );
    res.json({
        message:error.message
    })
})

app.listen(9090,()=>{
    console.log("server is running at port 9090...")
})

