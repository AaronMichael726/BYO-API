const mongoose = require('mongoose');
// Schema class from mongoose
const Schema = mongoose.Schema


// Make a capsuleSchema
const pokemonSchema = new Schema({
    name: { 
        type: String, 
        unique: true 
    },
    url: String,
    ability: [{
        type: Schema.Types.ObjectId,
        ref: "Ability"
    }]
});

// Model
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;