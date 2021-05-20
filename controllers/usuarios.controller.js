const Usuario = require('../models/usuario.model');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');
    res.json({
        ok: true,
        usuarios
    })
}
const crearUsuario = async (req, res=response) => {
    const { email, nombre, password } = req.body;
    try {
        const emailExiste = await Usuario.findOne({ email });
        if (emailExiste) {
            return res.status(400).json({ok:false,msg:'El correo ya registrado'})
        }
        console.log('hola1');
        const usuario = new Usuario(req.body);
        console.log('hola',usuario)
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        console.log('hola2');
        console.log('usuario',usuario)
        
        //Guardar usuario
        await usuario.save();
        //Generar token
        const token = await generarJWT(usuario.uid)
        res.json({
            ok: true,
            usuario,
            token
        })
    } catch (error) {
        res.status(500).json({ok:false,msg:'Error inesperado,revisar logs'})
    }


}

const actualizarUsuario = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        
        const {password, google, email, ...campos} = req.body;
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }
        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg:'Ya existe un usuario con ese email'
                })
            }
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos,{new:true});
        console.log(usuarioActualizado)
        return res.json({
            ok: true,
            usuario:usuarioActualizado
        })
    } catch (error) {
        res.status(500).json({ok:false,msg:'Error inesperado,revisar logs'})
    }
}

const borrarUsuario = async (req, res) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }
        await Usuario.findByIdAndDelete(uid);
        return res.status(200).json({
            ok: true,
            msg:'Usuario eliminado'
        })
    } catch (error) {
        res.status(500).json({ok:false,msg:'Error inesperado,revisar logs'})
    }
}













module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}