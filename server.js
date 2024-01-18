//Requires
const express = require('express');
var fs = require("fs");
const app = express();

const axios = require('axios');
const xml2js = require('xml2js');
//Librerías
var port = process.env.PORT || 3010; //Puerto, para no repetirlo

//Dependencias
app.use(express.json()); //Para leer ficheros json
app.use(express.static('public')); //Para que se tenga acceso a toda la carpeta public
 //Aqui se almacenarán los usuarios del archivo JSON

app.get('/rss', async (req, res) => {
    try{
        //Realiza la peticion HTTP para obtener el XML
        const response = await axios.get('https://www.mujerhoy.com/rss/2.0/portada');
        const xml = response.data;

        //Convierte el XML a JSON
        xml2js.parseString(xml, {explicitArray: false}, (err, result) => {
            if (err) {
                throw err;
            }
            //Envia el JSON al cliente
            res.json(result);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener el feed RSS');
    }
});

app.get('/atom', async (req, res) => {
    try{
        //Realiza la peticion HTTP para obtener el XML
        const response = await axios.get('https://www.mujerhoy.com/rss/atom/portada');
        const xml = response.data;

        //Convierte el XML a JSON
        xml2js.parseString(xml, {explicitArray: false}, (err, result) => {
            if (err) {
                throw err;
            }
            //Envia el JSON al cliente
            res.json(result);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener el feed ATOM');
    }
});

app.get('/rss/noticias', (req, res) => {
    var contenido = fs.readFileSync("./public/noticiasRSS.html");
    res.setHeader("Content-type", "text/html");
    res.send(contenido);
});

app.get('/atom/noticias', (req, res) => {
    var contenido = fs.readFileSync("./public/noticiasATOM.html");
    res.setHeader("Content-type", "text/html");
    res.send(contenido);
});

app.listen (port, () => {
    console.log('App funcionando en puerto ' + port);
})