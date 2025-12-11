import express from "express";
import { Product } from "../models/Product.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Ruta pública
router.get("/public", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos" });
  }
});

// Rutas privadas
router.get("/", authMiddleware, async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description, price, inStock } = req.body;

    const newProduct = await Product.create({
      name,
      description,
      price,
      inStock
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto eliminado" });
  } catch {
    res.status(500).json({ message: "Error al eliminar producto" });
  }
});

export default router;
