var express=require("express")
var Router=express.Router()
var evenementModel = require('../Models/evenementModel')
var associationModel = require('../Models/associationModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//test
Router.get("/",function (req,res) {
    res.send("c bn")
})

//liste evenement
Router.get("/all", function (req, res) {
    evenementModel.find({}).populate('association').populate('benevoles').exec(function (errr, result) {
        res.send(result)
    })
})
//validateUser

// un seul benevole
Router.get("/:id", function (req,res) {
    evenementModel.findOne({_id:req.params.id}).populate('association').populate('benevoles').exec(function (err, result) {
        if(err)
            res.send({"state":"not ok","msg":"err:"+err});
        else
            res.send(result);
    })
})

//ajouter evenement avec association (no benevole)
Router.post("/ajouter", function (req,res) {
    var evenement = new evenementModel({titre: req.body.titre, sujet: req.body.sujet,
        ville: req.body.ville, adresse: req.body.adresse, date: req.body.date,
        association: req.body.association, benevoles: req.body.benevoles});
    /*associationModel.findOne({_id: this.evenement.association}).exec((error, associationModel) => {
        associationModel.evenement.push(evenement);
    item.save(()=>{next();});
    associationModel.save();
});*/
    evenement.save(function (err) {
        if(err){
            res.send({"state":"not ok","msg":"err:"+err});
        }
        else{
            res.send({"state":"ok","msg":"Ajout evenement"});
        }
    })
})

//modification evenement avec benevole (no association)
Router.put("/modifier/:id", function (req,res) {
    evenementModel.updateOne({_id:req.params.id},{titre: req.body.titre, sujet: req.body.sujet,
        ville: req.body.ville, adresse: req.body.adresse, date: req.body.date,
        benevoles: req.body.benevoles}, function (err) {
        if(err)
            res.send({"state":"not ok","msg":"err:"+err});
        else
            res.send({"state":"ok","msg":"update evenement:"});
    })

})

//supprimer evenement
Router.delete("/supprimer/:id", function (req,res) {
    evenementModel.deleteOne({_id:req.params.id}, function (err) {
        if(err)
        {res.send({"state":"non","msg":"err:"+err});}
        else
        {res.send({"state":"ok","msg":"supprimer evenenemt:"});}
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
