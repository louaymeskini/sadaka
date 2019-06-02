var express = require("express")
var fs = require("fs")
var Router = express.Router()
var associationModel = require('../Models/associationModel')
var benevoleModel = require('../Models/benevoleModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});


//test
Router.get("/", function (req, res) {
  res.send("c bn")
})

//.populate('dons')

Router.get("/all", function (req, res) {
  associationModel.find({}).populate('benevoles').exec(function (errr, result) {
    res.send(result)
  })
})

// une seule association
Router.get("/:id", validateUser, function (req, res) {
  associationModel.findOne({_id: req.params.id}).populate('benevoles').exec(function (errr, result) {
    if (errr)
      res.send({"state": "not ok", "msg": "err:" + errr});
    else
      res.send(result);
  })
})

//trouver un benevole dans tous associations
//return liste des associations selon id de benevole bien determinee
//search by sub documents ID
Router.get("/trouver/benevole/:id", validateUser, function (req, res) {
    associationModel.find({benevoles: req.params.id}).exec(function (errr, result) {
            if (errr)
                res.send({"state": "not ok", "msg": "err:" + errr});
            else{
                // if(isEmptyObject(result)){
                //     result=JSON.stringify({"state":"vide", "msg":"aucune inscription trouvee pour ce benevole"});
                // }
                res.send(result);
            }
        })
})

// liste benevole d une seule association
Router.get("/liste/benevole/:id", validateUser, function (req, res) {
  associationModel.find({_id: req.params.id}).select('benevoles').populate('benevoles').exec(function (errr, result) {
    if (errr)
      res.send({"state": "not ok", "msg": "err:" + errr});
    else
      res.send(result);
  })
})

// liste annonce d une seule association
Router.get("/liste/annonce/:id", validateUser, function (req, res) {
  associationModel.find({_id: req.params.id}).select('annonces').populate('annonces').exec(function (errr, result) {
    if (errr)
      res.send({"state": "not ok", "msg": "err:" + errr});
    else
      res.send(result);
  })
})

// liste evenement d une seule association
Router.get("/liste/evenement/:id", validateUser, function (req, res) {
  associationModel.find({_id: req.params.id}).select('evenements').populate('evenements').exec(function (errr, result) {
    if (errr)
      res.send({"state": "not ok", "msg": "err:" + errr});
    else
      res.send(result);
  })
})

// une seule img
Router.get("/img/:imageAssociation", function (req, res) {
  //var file = __dirname + '/uploads/images' + req.file.originalname;
  try {
    res.sendFile(__dirname + '/uploads/images' + req.params.imageAssociation);
  }
  catch (err){
    //res.send({"state": "not ok", "msg": "err:" + err});
    res.json({status: "error", message: "image doesn't exist!!!", err});
  }
})

//ajouter association + benevoles + evenements + annonces
Router.post("/ajouter", upload.single('imageAssociation'), function (req, res) {

  var file = __dirname + '/uploads/images' + req.file.originalname;

  fs.readFile(req.file.path, function (err, data) {


    fs.writeFile(file, data, function (err) {
      if (err) {
        console.error(err);
        var response = {
          message: 'Sorry, file couldn\'t be uploaded.',
          filename: req.file.originalname
        };
      } else {
        response = {
          message: 'File uploaded successfully',
          filename: req.file.originalname
        };

        var association = new associationModel({
          imageAssociation: req.file.originalname, nom: req.body.nom,
          ville: req.body.ville, adresse: req.body.adresse,
          codePostale: req.body.codePostale, tel: req.body.tel,
          email: req.body.email, username: req.body.username, password: req.body.password,
          benevoles: req.body.benevoles, annonces: req.body.annonces,
          evenements: req.body.evenements
        });
        //association.benevole.push(this.association.benevole._id);
        association.save(function (err) {
          if (err) {
            res.send({"state": "not ok", "msg": "err:" + err});
          }
          else {
            res.send({"state": "ok", "msg": "Ajout association"});
          }
        })

      }
     // res.end(JSON.stringify(response));
    });
  });


})

//modifier imageAssociation
Router.put('/modifier/:id/imageassociation', upload.single("imageAssociation"), function (req, res) {
  var file = __dirname + '/uploads/images' + req.file.originalname;
  fs.readFile(req.file.path, function (err, data) {
    fs.writeFile(file, data, function (err) {
      if (err) {
        console.error(err);
        var response = {
          message: 'Sorry, file couldn\'t be uploaded.',
          filename: req.file.originalname
        };
      } else {
        response = {
          message: 'File uploaded successfully',
          filename: req.file.originalname
        };

        associationModel.updateOne({_id: req.params.id}, {
          imageAssociation: req.file.originalname}, function (err) {
          if (err)
            res.send({"state": "not ok", "msg": "err:" + err});
          else
            res.send({"state": "ok", "msg": "update:"});
        })
      }
    });
  });


})

Router.post('/file_upload', upload.single("file"), function (req, res) {

  var file = __dirname + '/uploads/images' + req.file.originalname;

  fs.readFile(req.file.path, function (err, data) {


    fs.writeFile(file, data, function (err) {
      if (err) {
        console.error(err);
        var response = {
          message: 'Sorry, file couldn\'t be uploaded.',
          filename: req.file.originalname
        };
      } else {
        response = {
          message: 'File uploaded successfully',
          filename: req.file.originalname
        };
      }
      res.end(JSON.stringify(response));
    });
  });
})

//modifier association + benevoles + evenements + annonces
Router.put("/modifier/:id", validateUser, function (req, res) {
  /*var file = __dirname + '/uploads/images' + req.file.originalname;
  fs.readFile(req.file.path, function (err, data) {
    fs.writeFile(file, data, function (err) {
      if (err) {
        console.error(err);
        var response = {
          message: 'Sorry, file couldn\'t be uploaded.',
          filename: req.file.originalname
        };
      } else {
        response = {
          message: 'File uploaded successfully',
          filename: req.file.originalname
        };*/
  associationModel.updateOne({_id: req.params.id}, {
    nom: req.body.nom,
    ville: req.body.ville, adresse: req.body.adresse,
    codePostale: req.body.codePostale, tel: req.body.tel,
    email: req.body.email, username: req.body.username, password: bcrypt.hashSync(req.body.password, saltRounds)
  }, function (err) {
    if (err)
      res.send({"state": "not ok", "msg": "err:" + err});
    else
      res.send({"state": "ok", "msg": "update:"});
      })
})

//delete association
Router.delete("/supprimer/:id", validateUser, function (req, res) {
  associationModel.deleteOne({_id: req.params.id}, function (err) {
    if (err) {
      res.send({"state": "non", "msg": "err:" + err});
    }
    else {
      res.send({"state": "ok", "msg": "supprimer association:"});
    }
  })
})

//delete benevole membre
Router.put("/supprimer/:id/benevole/:idB",validateUser, function (req, res) {
  associationModel.updateOne({_id: req.params.id}, {$pull:{benevoles: req.params.idB}}, function (err) {
      if (err) {
        res.send({"state": "non", "msg": "err:" + err});
      }
      else {
        //associationModel.save();
        res.send({"state": "ok", "msg": "supprimer benevole membre:"});
      }
  })
  })

//add benevole membre
Router.put("/ajouter/:id/benevole/:idB",validateUser, function (req, res) {
  associationModel.updateOne({_id: req.params.id}, {$push:{benevoles: req.params.idB}}, function (err) {
    //associationModel.benevoles.pull({_id: req.params.id}, function (err) {
    if (err) {
      res.send({"state": "non", "msg": "err:" + err});
    }
    else {
      /*if (benevoleModel.associations === undefined){
      benevoleModel.associations = [];
      }*/
        //benevoleModel.updateOne({_idB: req.params.idB}, {$push:{associations: req.params.id}})
            //this.benevoles.associations.push(this.associations);
        //benevoleModel.save();
      //});
      res.send({"state": "ok", "msg": "ajouter benevole membre:"});
    }
  })
})

//delete annonce of association
Router.put("/supprimer/:id/annonce/:idA", function (req, res) {
  associationModel.updateOne({_id: req.params.id}, {$pull:{annonces: req.params.idA}}, function (err) {
    if (err) {
      res.send({"state": "non", "msg": "err:" + err});
    }
    else {
      res.send({"state": "ok", "msg": "supprimer annonce du association:"});
    }
  })
})

//add annonce of association
Router.put("/ajouter/:id/annonce/:idA", function (req, res) {
  associationModel.updateOne({_id: req.params.id}, {$push:{annonces: req.params.idA}}, function (err) {
    if (err) {
      res.send({"state": "non", "msg": "err:" + err});
    }
    else {
      res.send({"state": "ok", "msg": "ajouter annonce du association"});
    }
  })
})

//delete evenement of association
Router.put("/supprimer/:id/evenement/:idE", function (req, res) {
  associationModel.updateOne({_id: req.params.id}, {$pull:{evenements: req.params.idE}}, function (err) {
    if (err) {
      res.send({"state": "non", "msg": "err:" + err});
    }
    else {
      res.send({"state": "ok", "msg": "supprimer evenement du association:"});
    }
  })
})

//add evenement of association
Router.put("/ajouter/:id/evenement/:idE", function (req, res) {
  associationModel.update({_id: req.params.id}, {$push:{evenements: req.params.idE}}, function (err) {
    if (err) {
      res.send({"state": "non", "msg": "err:" + err});
    }
    else {
      res.send({"state": "ok", "msg": "ajouter evenement du association"});
    }
  })
})

Router.post("/auth", function (req, res) {
  associationModel.findOne({$or: [{email: req.body.email}, {username: req.body.username}]}, function (err, userInfo) {
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
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.json({status: "error", message: err.message, data: null});
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
}

//check if res if empty
function isEmptyObject(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}


module.exports = Router;