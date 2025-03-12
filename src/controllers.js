const { User, Item } = require("./models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 📌 **Registro de usuario**
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "El usuario ya existe" });

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear usuario
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

// 📌 **Login de usuario**
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

        // Generar token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, userId: user._id, name: user.name });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

// 📌 **CRUD de Usuarios**
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Excluir contraseñas
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios", error });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar usuario", error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario", error });
    }
};

// 📌 **CRUD de Items**
const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener items", error });
    }
};

const createItem = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const newItem = new Item({ name, description, price, user: req.userId });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el item", error });
    }
};

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el item", error });
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        await Item.findByIdAndDelete(id);
        res.json({ message: "Item eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el item", error });
    }
};

// 📌 **Exportar todas las funciones**
module.exports = { registerUser, loginUser, getUsers, updateUser, deleteUser, getItems, createItem, updateItem, deleteItem };

