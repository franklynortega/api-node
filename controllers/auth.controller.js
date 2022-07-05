import { User } from "../models/Users.js";

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
    res.json({ok: "login"});
};
