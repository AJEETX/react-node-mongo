const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    Email: { type: String, unique: true, required: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Description: { type: String},
    ContactNumber: { type: Number, required: true },
    DateOfBirth: { type: Date, default: Date.now },
    Document: {type:String},
    modifiedDate: { type: Date, default: Date.now },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Candidate', schema);