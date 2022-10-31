const { Router } = require("express");
const router = Router();

var led = "0";
var coordenadas = [];

//Raiz
router.get("/", (req, res) => {
  //Envia json infoPuntos.json como respuesta
  const infoPuntos = require("./../../infoPuntos.json");
  res.json(infoPuntos);
});

//Get devuelve el estado de la tarjeta "Tarjeta N" que esta en el achivo infoPuntos.json
router.get("/Tarjeta/:id", (req, res) => {
  const { id } = req.params;
  //Recuperar el archivo infoPuntos.json
  const infoPuntos = require("./../../infoPuntos.json");
  //Recuperar de el listado de tarjetas el objeto que tenga el id que se envio
  const tarjeta = infoPuntos.tarjetas.find((tarjeta) => tarjeta.id == id);
  //Retornar el estado de la tarjeta
  console.log(tarjeta.propiedades.estado);
  res.end(tarjeta.propiedades.estado);
});

//Post cambia el estado de la tarjeta "Tarjeta N" que esta en el achivo infoPuntos.json
router.get("/Tarjeta/:id/on", (req, res) => {
  const { id } = req.params;
  //Recuperar el archivo infoPuntos.json
  const infoPuntos = require("./../../infoPuntos.json");
  //Recuperar de el listado de tarjetas el objeto que tenga el id que se envio
  const tarjeta = infoPuntos.tarjetas.find((tarjeta) => tarjeta.id == id);
  //Cambiar el estado de la tarjeta
  tarjeta.propiedades.estado = "1";
  //Guardar el archivo infoPuntos.json
  const fs = require("fs");
  fs.writeFile(
    "./../../infoPuntos.json",
    JSON.stringify(infoPuntos),
    "utf8",
    function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
      console.log("JSON file has been saved.");
    }
  );
  //Apagar de forma asincrona el led de la tarjeta
  setTimeout(function () {
    tarjeta.propiedades.estado = "0";
    //Guardar el archivo infoPuntos.json
    const fs = require("fs");
    fs.writeFile(
      "./../../infoPuntos.json",
      JSON.stringify(infoPuntos),
      "utf8",
      function (err) {
        if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
        }
        console.log("JSON file has been saved.");
      }
    );
  }, 15000);
  //Retornar el estado de la tarjeta
  res.end(tarjeta.propiedades.estado);
});

//Post cambia el estado de la tarjeta "Tarjeta N" que esta en el achivo infoPuntos.json
router.get("/Tarjeta/:id/off", (req, res) => {
  const { id } = req.params;
  //Recuperar el archivo infoPuntos.json
  const infoPuntos = require("./../../infoPuntos.json");
  //Recuperar de el listado de tarjetas el objeto que tenga el id que se envio
  const tarjeta = infoPuntos.tarjetas.find((tarjeta) => tarjeta.id == id);
  //Cambiar el estado de la tarjeta
  tarjeta.propiedades.estado = "0";
  //Guardar el archivo infoPuntos.json
  const fs = require("fs");
  fs.writeFile(
    "./../../infoPuntos.json",
    JSON.stringify(infoPuntos),
    "utf8",
    function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
      console.log("JSON file has been saved.");
    }
  );
  //Retornar el estado de la tarjeta
  res.end(tarjeta.propiedades.estado);
});

//Recibe coordenadas
router.post("/coordenadas", (req, res) => {
  //Guarda las coordenadas que recibe en post (lat y lon) en un arreglo
  coordenadas.push(req.body.lat);
  coordenadas.push(req.body.lon);
  res.header("Access-Control-Allow-Origin", "*");
  //regresa el mensaje de que se recibieron las coordenadas y la hora
  res.end(
    "Recibido: " + coordenadas[coordenadas.length - 1] + " " + new Date()
  );
  console.log(coordenadas);
});

module.exports = router;
