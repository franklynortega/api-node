import { User } from "../models/Users.js";
import jwt from 'jsonwebtoken'; 

export const register = async(req, res) => {
   const {email, password} = req.body

    try {
        //Alternativa Lógica
        /*
            let user = await User.findOne({email}) 
            if(user) throw {code : 11000}
        */
        const user = new User({ email, password });

        await user.save();
        //jwt token 
        return res.status(201).json({ok: true});
    } catch (error) {
        console.log(error)
        //Alernativa Mongoose
        if(error.code === 11000) {
            return res.status(400).json({error:"Ya se encuentra registrado el email" })
        }
        return res.status(500).json({error: "Error de Servidor"})
    }

};


export const login = async(req, res) => {
    try {
        const {email, password} = req.body;

        let user = await User.findOne({ email });
        
        if (!user) 
            return res.status(403).json({ error: "Credenciales Incorrectas" });

        const passwordResponse = await user.comparePassword(password)        
        
        if(!passwordResponse) {
            return res.status(403).json({ error: "Credenciales Incorrectas" });
        }

        // Generar JWT
        const token = jwt.sign({uid: user.id}, process.env.JWT_SECRET); 

        return res.json({ token });
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Error de Servidor"});
    }
};
