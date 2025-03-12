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
        res.status(500).json({ message: "Error en el servidor", error: error.message });
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
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

// 📌 **CRUD de Usuarios**
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Excluir contraseñas
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "Usuario no encontrado" });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar usuario", error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: "Usuario no encontrado" });

        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario", error: error.message });
    }
};

// 📌 **CRUD de Items**
const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener items", error: error.message });
    }
};

// ✅ **Obtener un item por ID**
const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id);
        if (!item) return res.status(404).json({ message: "Item no encontrado" });

        res.json(item);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el item", error: error.message });
    }
};

const createItem = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const newItem = new Item({ name, description, price, user: req.userId });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el item", error: error.message });
    }
};

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: "Item no encontrado" });

        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el item", error: error.message });
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) return res.status(404).json({ message: "Item no encontrado" });

        res.json({ message: "Item eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el item", error: error.message });
    }
};

// 📌 **Exportar todas las funciones**
module.exports = { 
    registerUser, 
    loginUser, 
    getUsers, 
    updateUser, 
    deleteUser, 
    getItems, 
    getItemById,  // ✅ Nuevo método agregado
    createItem, 
    updateItem, 
    deleteItem 
};
