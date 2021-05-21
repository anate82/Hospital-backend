const { response } = require('express');
const Hospital = require('../models/hospital.model');

const getHospitales = async (req, res) => {
    const hospitales = await Hospital.find()
                                    .populate('usuario', 'nombre img')
    res.json({
        ok: true,
        hospitales
    })
}
const crearHospital = async (req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({usuario:uid,...req.body});
    try {
        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            hospital:hospitalDB
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg:'Hable con el administrador'
        })
    }
}
const actualizarHospital = (req, res) => {
    res.json({
        ok: true,
        msg:'crearHospital'
    })
}
const borrarHospital = (req, res) => {
    res.json({
        ok: true,
        msg:'crearHospital'
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}