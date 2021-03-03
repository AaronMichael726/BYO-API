const mongoose = require('mongoose');
// Schema class from mongoose
const Schema = mongoose.Schema;

// Make a capsuleSchema
const abilitySchema = new Schema({
    name: String,
    isHidden: Boolean,
    slot: Number,
    pokemon: {
        type: Schema.Types.ObjectId, 
        ref: 'Pokemon'
    }
});

// Model
const Ability = mongoose.model('Ability', abilitySchema);

module.exports = Ability;