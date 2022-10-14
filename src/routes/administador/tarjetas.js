const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  //Responde con un json que muestre todas las tarjetas de nuetro archivo "infoPuntos.json"
  const infoPuntos = require("./../../../infoPuntos.json");
  res.json(infoPuntos.tarjetas);
});

//Metodo para agregar una nueva tarjeta
router.post("/agregar", (req, res) => {
  //Recibe un json con la informacion de la nueva tarjeta
  const nuevaTarjeta = req.body;
  //Obtiene el archivo infoPuntos.json
  const infoPuntos = require("./../../../infoPuntos.json");
  //Agrega la nueva tarjeta al arreglo de tarjetas
  infoPuntos.tarjetas.push(nuevaTarjeta);
  //Escribe el archivo infoPuntos.json con la nueva tarjeta
  const fs = require("fs");
  fs.writeFile(
    "./infoPuntos.json",
    JSON.stringify(infoPuntos),
    "utf8",
    (err) => {
      if (err) {
        console.log(err);
        //Envia un codigo de error 500
        res.status(500).send("Error al agregar tarjeta");
      }
    }
  );
  //Envia un codigo 200 como respuesta
  res.sendStatus(200);
});

//Metodo para eliminar una tarjeta
router.delete("/eliminar/:id", (req, res) => {
  //Obtiene el id de la tarjeta a eliminar
  const id = req.params.id;
  //Obtiene el archivo infoPuntos.json
  const infoPuntos = require("./../../../infoPuntos.json");
  //Filtra el arreglo de tarjetas para eliminar la tarjeta con el id recibido
  infoPuntos.tarjetas = infoPuntos.tarjetas.filter((tarjeta) => {
    return tarjeta.id !== id;
  });
  //Escribe el archivo infoPuntos.json sin la tarjeta eliminada
  const fs = require("fs");
  fs.writeFile(
    "./infoPuntos.json",
    JSON.stringify(infoPuntos),
    "utf8",
    (err) => {
      if (err) {
        console.log(err);
        //Envia un codigo de error 500
        res.status(500).send("Error al eliminar tarjeta");
      }
    }
  );
  //Envia un codigo 200 como respuesta
  res.sendStatus(200);
});

module.exports = router;
