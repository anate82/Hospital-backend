
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model')
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        console.log(Usuario)
        const usuarioDB = await Usuario.findOne({ email });
        console.log(usuarioDB)
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg:'Error en Email'
            })
        }
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg:'Error en Contraseña'
            })
        }

        //generar Token
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ok:false,msg:'Error inesperado,revisar logs'})
    }
}

module.exports = {
    login
}