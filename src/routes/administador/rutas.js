const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  //Envia json infoPuntos.json el objeto "rutas" como respuesta
  const infoPuntos = require("./../../../infoPuntos.json");
  res.json(infoPuntos.rutas);
});

module.exports = router;
