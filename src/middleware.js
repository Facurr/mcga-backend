const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. No hay token." });
    }

    try {
        // Si el token viene con "Bearer ", eliminarlo antes de verificarlo
        const cleanToken = token.startsWith("Bearer ") ? token.slice(7).trim() : token;

        const verified = jwt.verify(cleanToken, process.env.JWT_SECRET);
        req.userId = verified.userId;
        next();  // Continuar con la siguiente función en la ruta
    } catch (error) {
        res.status(400).json({ message: "Token inválido." });
    }
};

module.exports = authMiddleware;

