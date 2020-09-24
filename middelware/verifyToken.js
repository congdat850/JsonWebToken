 const jwt= require("jsonwebtoken");
module.exports = (req, res,next) => {
    const token = req.header("auth-token");

    if (!token) return res.status(401).send("Acces Denied");
    try {
        jwt.verify(token, "congdat");
        next();
    }
    catch (err) {
        return res.status(400).send("invalid Token");
    }
}