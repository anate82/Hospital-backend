const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection }= require('./database/config')
//Crear servidor express
const app = express();
//Base de datos
dbConnection();
// Configurar Cors
app.use(cors());


//Rutas

app.get('/', (req,res) => {
    res.status(200).json({
        ok: true,
        msg:'Hola mundo'
    })
});

app.listen(process.env.PORT, () => {
    console.log(`Sevidor corriendo en ${process.env.PORT}`);
})

