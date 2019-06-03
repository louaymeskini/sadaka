var express=require("express")
var cors=require("cors")
var fs=require("fs")
var mongoose = require('mongoose');
var multer=require("multer")
const path = require("path")
var bodyParser = require('body-parser')
const upload = multer({dest: __dirname + '/uploads/images'});

var admin=require("./Router/admin")
var benevole=require("./Router/benevole")
var association=require("./Router/association")
var evenement=require("./Router/evenement")
var annonce=require("./Router/annonce")
var don=require("./Router/don")
var user=require("./Router/user")

require("./Models/db")
var app=express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false,limit: "50mb", parameterLimit:50000 }))
//app.use('/uploads', express.static('uploads'));  ,limit: "50mb", parameterLimit:50000
// parse application/json
app.use(bodyParser.json())
app.set('secretKey', 'louay'); // jwt secret token

app.use("/admin",admin)
app.use("/benevole",benevole)
app.use("/association",association)
app.use("/evenement",evenement)
app.use("/annonce",annonce)
app.use("/don",don)
app.use("/auth",user)

//mongoose.connect('mongodb+srv://sadaka:louay*0147@sadaka-ljoq6.mongodb.net/test?retryWrites=true&w=majority',
//(err) => {
 // if(err){console.error("Mongodb error: ",err)}
 // else{console.log("Database connected")}
//})

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'build')));
}

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Connected to port ${port}`));
