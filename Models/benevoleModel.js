var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var Schema = mongoose.Schema;


var benevoleModelSchema = new Schema({
    nom: {
        type: String,
        trim: true,
        required: true,
    },
    prenom: {
        type: String,
        trim: true,
        required: true,
    },
    sexe: {
        type: String,
        trim: true,
        required: true,
    },
    ville: {
        type: String,
        trim: true,
        required: true,
    },
    adresse: {
        type: String,
        trim: true,
        required: true,
    },
    codePostale: {
        type: Number,
        trim: true,
        required: true,
    },
    tel: {
        type: Number,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    username: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
        associations:[
            {
                type: mongoose.Schema.Types.ObjectId, ref:"associationModel"
            }
        ],
        evenements:[
            {
                type: Schema.Types.ObjectId, ref:"evenementModel"
            }
        ],
        annonces:[
            {
                type: Schema.Types.ObjectId, ref:"annonceModel"
            }
        ],
        dons:[
            {
                type: Schema.Types.ObjectId, ref:"donModel"
            }
        ]
    },
    {
        timestamps: true
    });

benevoleModelSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
    ////
   /* associationModel.findOne({_id: this.benevole.association}).exec((error, item) => {
        item.benevole.push(associationModel.benevole);
        //item.save(()=>{next();});
        item.save();
});*/
    ////
})

// Compile model from schema
var benevoleModel = mongoose.model('benevoleModel', benevoleModelSchema );
module.exports=benevoleModel;