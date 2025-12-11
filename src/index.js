import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

// Importar rutas
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/products.routes.js";

// Crear app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check para Render (opcional pero recomendado)
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

// Ruta pública de prueba
app.get("/", (req, res) => {
  res.send("API MCGA funcionando");
});

// Rutas del proyecto
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Configurar puerto dinámico para Render
const PORT = process.env.PORT || 4000;

// Conectar BD y levantar servidor con manejo de errores
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar con MongoDB:", err);
    console.log("⚠ La app NO se cerrará para que Render siga reiniciando.");
  });

// Manejo adicional para ver errores en Render
process.on("uncaughtException", (err) => console.error("❌ uncaught:", err));
process.on("unhandledRejection", (err) => console.error("❌ unhandled:", err));

