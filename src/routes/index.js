const { Router } = require("express");
const router = Router();

var led = "0";
var coordenadas = [];

//Raiz
router.get("/", (req, res) => {
  res.end(led);
});

//Encender
router.get("/on", (req, res) => {
  led = "1";
  res.header("Access-Control-Allow-Origin", "*");

  res.end(led);
});

//Apagar
router.get("/off", (req, res) => {
  led = "0";
  res.header("Access-Control-Allow-Origin", "*");
  res.end(led);
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
