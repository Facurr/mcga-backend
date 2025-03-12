const jwt = require("jsonwebtoken");

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. No hay token." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verified.userId;
        next();  // Continuar con la siguiente función en la ruta
    } catch (error) {
        res.status(400).json({ message: "Token inválido." });
    }
};

module.exports = authMiddleware;
