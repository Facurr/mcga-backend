const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();  // Cargar variables de entorno

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Importar rutas
const routes = require("./routes");
app.use("/api", routes);  // ✅ Todas las rutas estarán bajo `/api`

// Ruta raíz para verificar si el backend funciona
app.get("/", (req, res) => {
    res.send("🚀 Backend funcionando correctamente");
});

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB conectado"))
    .catch(err => console.error("❌ Error en la conexión a MongoDB:", err));

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));

module.exports = app;

