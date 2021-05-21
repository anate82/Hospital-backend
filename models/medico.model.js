const mongoose = require('mongoose');

const MedicoSchema = mongoose.Schema({
    nombre: {
        type: String,
        require:true,

    },
    img: {
        type: String,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true
    },
    hospital: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required:true
    }]
}, {collection:'medicos'})

MedicoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})
module.exports = mongoose.model('Medico', MedicoSchema);