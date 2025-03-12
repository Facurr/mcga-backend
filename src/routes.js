const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUsers, updateUser, deleteUser, getItems, createItem, updateItem, deleteItem } = require("./controllers");
const authMiddleware = require("./middleware.js"); // Middleware opcional para autenticación

// 🔹 Rutas de Usuarios
router.post("/register", registerUser);  // Crear usuario
router.post("/login", loginUser);        // Iniciar sesión
router.get("/users", getUsers);          // Obtener todos los usuarios
router.put("/users/:id", updateUser);    // Actualizar usuario
router.delete("/users/:id", deleteUser); // Eliminar usuario

// 🔹 Rutas de Items (CRUD)
router.get("/items", getItems);                 // Obtener todos los items
router.post("/items", authMiddleware, createItem); // Crear item (requiere autenticación)
router.put("/items/:id", authMiddleware, updateItem); // Actualizar item
router.delete("/items/:id", authMiddleware, deleteItem); // Eliminar item

module.exports = router;

