const { response } = require('express');
const Medico = require('../models/medico.model');

const getMedicos = async (req, res) => {
    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre')
    
    res.json({
        ok: true,
        medicos
    })
}
const crearMedico = async (req, res) => {
    const uid = req.uid;
    const medico = new Medico({ usuario: uid, ...req.body });
    try {
        const medicoDB = await medico.save();
        res.json({
            ok: true,
            medico:medicoDB
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg:'Hable con el administrador'
        })
    }
}
const actualizarMedico = async(req, res) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado por id'
            })
        }
        const medicoActualizar = {
            ...req.body,
            usuario:uid
        }
        const medicoActualizado = await Medico.findByIdAndUpdate(id,medicoActualizar,{new:true})
        res.json({
        ok: true,
        medicoActualizado
    })
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    
}
const borrarMedico = async (req, res) => {

    const id = req.params.id;
    const uid = req.uid;
    try {
        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado por id'
            })
        }
        await Medico.findByIdAndDelete(id)
        res.json({
            ok: true,
            msg:'Medico eliminado'
        })
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}