const { Router } = require("express");
const QRCode = require("qrcode");
const router = Router();

router.get("/", (req, res) => {
  res.end("Soy el generador de QR");
});

//Metodo para generar un QR a partir de un texto, despues de generar el QR se envia como respuesta de descarga
router.get("/:texto", (req, res) => {
  const texto = req.params.texto;
  QRCode.toFileStream(res, texto, {
    width: 300,
    margin: 1,
    color: {
      dark: "#000000",
      light: "#fff",
    },
  });
  //despues de generar el QR se envia como respuesta de descarga
  res.setHeader("Content-Type", "image/png");
  res.setHeader("Content-Disposition", "attachment; filename=qr.png");
});

module.exports = router;
