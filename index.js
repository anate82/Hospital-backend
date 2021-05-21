const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config')
//Crear servidor express
const app = express();

// Configurar Cors
app.use(cors());
//lectura y parseo body
app.use(express.json());
//Base de datos
dbConnection();

app.use('/api/usuarios', require('./routes/usuarios.routes'))
app.use('/api/login', require('./routes/auth.routes'))
app.use('/api/hospitales', require('./routes/hospitales.routes'))
app.use('/api/medicos', require('./routes/medicos.routes'))
app.use('/api/todo', require('./routes/busquedas.routes'))
app.use('/api/upload', require('./routes/upload.routes'))

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})

