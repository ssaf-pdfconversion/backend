import { Request, Response } from 'express';
import { SOAPclientReg } from '../models/model/RegisterModel'

class RegisterController {

    public async register(req: Request, res: Response){

        const {username, password, nombre, apellido, email} = req.body;
        const soapClient = new SOAPclientReg();

        const result = await soapClient.register(username, password, nombre, apellido, email);
        if (result.success) {
            res.status(200).json({ 
                message: 'Usuario registrado correctamente', 
                timestamp: result.timestamp,
            });
            console.log("El app-server respondio lo siguiente:" + result.message + " A las " + result.timestamp);
        } else {
            res.status(401).json({ message: 'Error al registrar el usuario' });
        }

    }

}

export default new RegisterController();