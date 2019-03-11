var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var Schema = mongoose.Schema;


var associationModelSchema = new Schema({
        nom: {
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
        benevoles:[
            {
                type: Schema.Types.ObjectId, ref:"benevoleModel"
            }
        ],
        annonces:[
            {
                type: Schema.Types.ObjectId, ref:"annonceModel"
            }
        ],
        evenements:[
            {
                type: Schema.Types.ObjectId, ref:"evenementModel"
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

associationModelSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();

    /*this.benevole.push({
        _id: { $in : associationModelSchema.benevole}
    }).toArray();*/


    /*associationModel.findOne({_id: this.benevole.association}).exec((error, item) => {
        item.benevole.push(associationModel.benevole);
        //item.save(()=>{next();});
        item.save();
});*/

})

// Compile model from schema
var associationModel = mongoose.model('associationModel', associationModelSchema );
module.exports=associationModel;