const mongoose = require('mongoose');

const HospitalSchema = mongoose.Schema({
    nombre: {
        type: String,
        require:true,

    },
    img: {
        type: String,
    },
    usuario: {
        required:true,
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    }
}, {collection:'hospitales'})

HospitalSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})
module.exports = mongoose.model('Hospital', HospitalSchema);