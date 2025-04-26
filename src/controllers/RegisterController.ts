import { Request, Response } from 'express';
import { registerUser } from '../models/model/RegisterModel'

class RegisterController {

    
    public async registerdos(req: Request, res: Response){

        const {username, password, nombre, apellido, email} = req.body;
        console.log('Si entro al regsiter yayyys')

        const result = await registerUser(username, password, nombre, apellido, email);
        if (result.success.toString() === "true") {
            res.status(200).json({ 
                message: 'Usuario registrado correctamente', 
                data: result.content,
                timestamp: result.timestamp,
            });
            console.log("El app-server respondio lo siguiente:" + result.message + " A las " + result.timestamp);
        } else {
            res.status(401).json({ message: 'Error al registrar el usuario' });
        }

    }


    

}

export default new RegisterController();