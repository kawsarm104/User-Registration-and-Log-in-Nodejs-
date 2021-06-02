const express = require('express');
const expbs = require('express-handlebars');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const bodyParser = require('body-parser')
//const mongoose = require('mongoose');
var session = require('express-session')//ekhane amar cookies session validator flash esob er kicui use hoy nai
var cookieParser = require('cookie-parser')
var flash = require('connect-flash');
const { check, validationResult } = require('express-validator')

require('./db/connect');
const Register = require('./model/userregister');

 
var app = express()

app.use(cookieParser());

//Express Session
//app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
  
  //cookie: { secure: true }
}))
app.use(flash());
 //app.use(express.json());//for postman
// parse application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false })//urlencodedParser eita nia post api te bosaite hobe 
 //joto jaygay form er data thakbe toto jaygay eta bosate hobe


/*app.post('/profile', upload.single('mainimage'),  (req, res, next)=>{
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})*/


app.engine('handlebars', expbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//Routing 
app.get('/',(req,res)=>{
    res.render('home',{title : 'Home Page'});
})

app.get('/contact',(req,res)=>{
    res.render('contact',{title : 'Contact Page'});
})

app.get('/about',(req,res)=>{
    res.render('about',{title : 'About Page'});
})
app.get('/register',(req,res)=>{
    res.render('register',{title : 'Register Page'});
})
//Creating new user in our database 
app.post('/register',urlencodedParser, async(req,res)=>{
    try {
        //console.log(req.body.user_name)
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;

        if(password === confirmpassword){
            const userRegister = new Register({
                email:req.body.email,
                user_name:req.body.user_name,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword,
            })
          const registerd = userRegister.save();
          console.log("registration successful")
          res.send("registration successful")
          res.render("home");

        }else{
            res.send("Password not matched");
        }
        

    } catch (error) {
        res.status(400).send(error);
    }
  
})
app.get('/login',(req,res)=>{
    res.render('login',{title : 'Login Page'});
})
// Login Check 
app.post('/login',urlencodedParser,async(req,res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        //console.log(`email is ${email} and password is ${password}`)
        const useremail = await Register.findOne({email:email});
        // res.send(useremail)
        console.log(useremail)
        if(useremail.password === password){
            console.log("login successful")
            //res.send("login successful")
          res.status(201).render("home")
        }else{
          res.send("Username and Password are not matching")
        }
    } catch (error) {
        res.status(400).send("Invalid user")
    }
})

app.get('/addpost',(req,res)=>{
    res.render('addpost',{title : 'Add Post'});
})
app.post('/addpost',urlencodedParser,upload.single('mainimage'),(req,res,next)=>{
    console.log(req.body);

     // Check Image Upload
  if(req.file){
    console.log("one image upload successfully");
} else {
    console.log("No image uploaded");
}
       res.render('/addpost',{title : 'Add Post'});/*,{
        data: req.body
    });*/
})

//Server
app.listen(3000,()=>{
    console.log('server is running at port ', 3000);
})