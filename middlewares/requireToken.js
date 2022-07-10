import jwt from 'jsonwebtoken' 

export const requireToken = (req, res, next) => {
    
    try {
      let token = req.headers?.authorization;
      if (!token) throw new Error("Ruta protegida");
      token = token.split(" ")[1];
      const { uid } = jwt.verify(token, process.env.JWT_SECRET);
      
      req.uid = uid;
      
      next();
    } catch (error) {
        console.log(error.message);

        const TokenVerificationErrors = {
            "invalid signature": "La firma no es válida",
            "jwt expired": "Token expirado",
            "invalid token": "Token invalido",
            "No Bearer": "Debes usar el formato Bearer",
            "jwt malformed": "JWT formato no válido"
        };

        return res
            .status(401)
            .json({error: TokenVerificationErrors[error.message] })
    } 
}