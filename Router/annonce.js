var express=require("express")
var Router=express.Router()
var annonceModel = require('../Models/annonceModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//test
Router.get("/",function (req,res) {
    res.send("c bn")
})

//liste annonce
Router.get("/all", function (req, res) {
    annonceModel.find({}).populate('association').populate('benevoles').exec(function (errr, result) {
        res.send(result)
    })
})
//validateUser

// un seul annonce
Router.get("/:id", function (req,res) {
    annonceModel.findOne({_id:req.params.id}).populate('association').populate('benevoles').exec(function (err, result) {
        if(err)
            res.send({"state":"not ok","msg":"err:"+err});
        else
            res.send(result);
    })
})

//ajouter annonce + benevoles + association
Router.post("/ajouter", function (req,res) {
    annonce = new annonceModel({titre: req.body.titre, sujet: req.body.sujet,
        pieceJointe: req.body.pieceJointe, association: req.body.association,
        benevoles: req.body.benevoles});

    annonce.save(function (err) {
        if(err){
            res.send({"state":"not ok","msg":"err:"+err});
        }
        else{
            res.send({"state":"ok","msg":"Ajout annonce"});
        }
    })
})

//modification annonce + benevoles + association
Router.put("/modifier/:id", function (req,res) {
    annonceModel.updateOne({_id:req.params.id},{titre: req.body.titre, sujet: req.body.sujet,
        pieceJointe: req.body.pieceJointe, association: req.body.association,
        benevoles: req.body.benevoles}, function (err) {
        if(err)
            res.send({"state":"not ok","msg":"err:"+err});
        else
            res.send({"state":"ok","msg":"update annonce:"});
    })

})

//supprimer annonce
Router.delete("/supprimer/:id", function (req,res) {
    annonceModel.deleteOne({_id:req.params.id}, function (err) {
        if(err)
        {res.send({"state":"non","msg":"err:"+err});}
        else
        {res.send({"state":"ok","msg":"supprimer annonce:"});}
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