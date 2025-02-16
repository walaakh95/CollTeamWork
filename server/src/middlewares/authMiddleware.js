const { verifyAccessToken } = require("../utils/tokenManager");


const authMiddleware = async (req, res, next) => {
    const accessToken = req.header("Authorization");
    if (!accessToken) return res.status(401).json({ error: "Access denied" });

    try {
        const decoded = await verifyAccessToken(accessToken)
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid token" });
    }
};

module.exports = authMiddleware;
