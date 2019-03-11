var express=require("express")
var Router=express.Router()
var associationModel = require('../Models/associationModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//test
Router.get("/",function (req,res) {
    res.send("c bn")
})

//liste association
/*Router.get("/all",function (req,res) {
    associationModel.find({},function (errr,result) {
        res.send((result))
    })
})*/
//validateUser

//.populate('dons')
Router.get("/all", function (req, res) {
    associationModel.find({}).populate('benevoles').populate('annonces').populate('evenements').exec(function (errr, result) {
        res.send(result)
    })
})

// une seule association
Router.get("/:id", function (req,res) {
    associationModel.findOne({_id:req.params.id}, function (err,result) {
        if(err)
            res.send({"state":"not ok","msg":"err:"+err});
        else
            res.send(result);
    })
})

//ajouter association + benevoles + evenements + annonces
Router.post("/ajouter", function (req,res) {
    association = new associationModel({nom: req.body.nom,
        ville: req.body.ville, adresse: req.body.adresse,
        codePostale: req.body.codePostale, tel: req.body.tel,
        email: req.body.email, username: req.body.username, password: req.body.password,
        benevoles: req.body.benevoles, annonces: req.body.annonces,
        evenements: req.body.evenements});
    //association.benevole.push(this.association.benevole._id);
    association.save(function (err) {
        if(err){
            res.send({"state":"not ok","msg":"err:"+err});
        }
        else{
            res.send({"state":"ok","msg":"Ajout association"});
        }
    })
})

//modifier association + benevoles + evenements + annonces
Router.put("/modifier/:id", function (req,res) {
    associationModel.updateOne({_id:req.params.id}, {nom: req.body.nom,
        ville: req.body.ville, adresse: req.body.adresse,
        codePostale: req.body.codePostale, tel: req.body.tel,
        email: req.body.email, username: req.body.username, password: req.body.password,
        benevoles: req.body.benevoles, annonces: req.body.annonces,
        evenements: req.body.evenements}, function (err) {
        if(err)
            res.send({"state":"not ok","msg":"err:"+err});
        else
            res.send({"state":"ok","msg":"update:"});
    })
})

//delete association
Router.delete("/supprimer/:id", function (req,res) {
    associationModel.deleteOne({_id:req.params.id}, function (err) {
        if(err)
        {res.send({"state":"non","msg":"err:"+err});}
        else
        {res.send({"state":"ok","msg":"supprimer association:"});}
    })
})

Router.post("/auth", function (req,res) {
    associationModel.findOne({ $or: [{email: req.body.email}, {username: req.body.username}]}, function (err, userInfo) {
        try {
            if (err) {
                next(err);
            }
            else {
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), {expiresIn: '1h'});
                    res.json({status: "success", message: "user found!!!", data: {user: userInfo, token: token}});
                }
                else {
                    res.json({status: "error", message: "Invalid email/password!!!", data: null});
                }
            }
        }
        catch (err) {
            res.json({status: "error", message: "Invalid email/password!!!", data: null});
        }
    })
})

//valider l'accées pour certain interfaces
function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
        if (err) {
            res.json({status:"error", message: err.message, data:null});
        }else{
            // add user id to request
            req.body.userId = decoded.id;
            next();
        }
    });
}



module.exports=Router;