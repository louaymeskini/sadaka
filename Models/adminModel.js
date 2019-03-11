var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var Schema = mongoose.Schema;


var adminModelSchema = new Schema({
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
        }
    },
    {
        timestamps: true
    });

adminModelSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
})

// Compile model from schema
var adminModel = mongoose.model('adminModel', adminModelSchema );
module.exports=adminModel;