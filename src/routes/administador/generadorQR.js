const { Router } = require("express");
const QRious = require("qrious");
const router = Router();

router.get("/", (req, res) => {
  res.end("Soy el generador de QR");
});

//Metodo para generar un QR a partir de un texto, despues de generar el QR se envia como respuesta de descarga
router.get("/:texto", (req, res) => {
  //Obtiene el texto a partir de la url
  const texto = req.params.texto;
  //Generar la imagen donde se guardara el QR
  //Generar un canvas para poder generar el QR
  const canvas = document.createElement("canvas");
  //Generar el QR
  const qr = new QRious({
    element: canvas,
    value: texto,
    size: 500,
    backgroundAlpha: 0, // 0 para fondo transparente
    foreground: "#000", // Color del QR
    level: "M", // Puede ser L,M,Q y H (L es el de menor nivel, H el mayor)
  });
  //TODO Generar el enlace de descargar del QR
});

module.exports = router;
