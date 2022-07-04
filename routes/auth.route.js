import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
const router = express.Router();

router.post(
    "/register", 
    [
    body('email', "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', "El password debe contener ente 6 y 14 caracteres")
        .trim()
        .isLength({min: 6, max: 14})
        .custom((value, {req}) => { 
            if(value !== req.body.password){
                throw new Error('No coincide las contaseñas') 
            }
            return value
        })
    ],
    validationResultExpress,
    register
);
    

// router.post("/register", register);
router.post(
    "/login", 
    [ 
    body('email', "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', "El password debe contener ente 6 y 14 caracteres").trim().isLength({min: 6, max: 14})
    ],
    validationResultExpress,
    login
);


export default router;