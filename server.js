var express=require("express")
var cors=require("cors")
var bodyParser = require('body-parser')

var admin=require("./Router/admin")
var benevole=require("./Router/benevole")
var association=require("./Router/association")
var evenement=require("./Router/evenement")
var annonce=require("./Router/annonce")
var don=require("./Router/don")

var db=require("./Models/db")
var app=express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.set('secretKey', 'louay'); // jwt secret token

app.use("/admin",admin)
app.use("/benevole",benevole)
app.use("/association",association)
app.use("/evenement",evenement)
app.use("/annonce",annonce)
app.use("/don",don)

app.listen(8000,function () {
    console.log("Connected to port 8000")
})