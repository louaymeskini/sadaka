var express = require("express")
var fs = require("fs")
var Router = express.Router()
var associationModel = require('../Models/associationModel')
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
Router.get("/all", validateUser, function (req, res) {
  associationModel.find({}).populate('benevoles').populate('annonces').populate('evenements').exec(function (errr, result) {
    res.send(result)
  })
})

// une seule association
Router.get("/:id", validateUser, function (req, res) {
  associationModel.findOne({_id: req.params.id}, function (err, result) {
    if (err)
      res.send({"state": "not ok", "msg": "err:" + err});
    else
      res.send(result);
  })
})

// une seule img
Router.get("/img/:imageAssociation", function (req, res) {
  //var file = __dirname + '/uploads/images' + req.file.originalname;
  res.sendFile(__dirname + '/uploads/images'+req.params.imageAssociation);
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
Router.put("/modifier/:id", upload.single('imageAssociation'), validateUser, function (req, res) {
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
    imageAssociation: req.file.originalname, nom: req.body.nom,
    ville: req.body.ville, adresse: req.body.adresse,
    codePostale: req.body.codePostale, tel: req.body.tel,
    email: req.body.email, username: req.body.username, password: bcrypt.hashSync(req.body.password, saltRounds)
  }, function (err) {
    if (err)
      res.send({"state": "not ok", "msg": "err:" + err});
    else
      res.send({"state": "ok", "msg": "update:"});

      })

  }
  // res.end(JSON.stringify(response));
});
});


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


module.exports = Router;
