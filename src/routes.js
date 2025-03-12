const express = require("express");
const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    getUsers, 
    updateUser, 
    deleteUser, 
    getItems, 
    getItemById, 
    createItem, 
    updateItem, 
    deleteItem 
} = require("./controllers");

const authMiddleware = require("./middleware.js"); // Middleware de autenticación

// 🔹 Rutas de Usuarios
router.post("/register", registerUser);  // Crear usuario
router.post("/login", loginUser);        // Iniciar sesión
router.get("/users", authMiddleware, getUsers);          // 🔒 Obtener todos los usuarios (protegido)
router.put("/users/:id", authMiddleware, updateUser);    // 🔒 Actualizar usuario (protegido)
router.delete("/users/:id", authMiddleware, deleteUser); // 🔒 Eliminar usuario (protegido)

// 🔹 Rutas de Items (CRUD)
router.get("/items", getItems);                           // Obtener todos los items (público)
router.get("/items/:id", authMiddleware, getItemById);    // 🔒 Obtener un ítem por ID (ahora protegido)
router.post("/items", authMiddleware, createItem);        // 🔒 Crear item (protegido)
router.put("/items/:id", authMiddleware, updateItem);     // 🔒 Actualizar item (protegido)
router.delete("/items/:id", authMiddleware, deleteItem);  // 🔒 Eliminar item (protegido)

module.exports = router;