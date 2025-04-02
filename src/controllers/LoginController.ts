import { Request, Response } from 'express';
import { SOAPClient } from '../models/LoginModel';

class LoginController {

    public async login(req: Request, res: Response) {
        const { username, password } = req.body;
        console.log("Si entro al controller de login");
        const soapClient = new SOAPClient();
        const result = await soapClient.loginUser(username, password);
        console.log(result);
        if (result.success) {
            res.status(200).json({ 
                message: 'Usuario autenticado' , 
                token: result.content,
                timestamp: result.timestamp,
            });

            console.log("El app-server respondio lo siguiente:" + result.message + " A las " + result.timestamp);
        } else {
            res.status(401).json({ message: 'Usuario no autenticado' });
        }
    }


    public async validate(req: Request, res: Response) {
        const { token } = req.body;
        const soapClient = new SOAPClient();
        const result = await soapClient.validate(token);
        if (result.success) {
            res.status(200).json({ message: 'Token valido' });
        } else {
            res.status(401).json({ message: 'Token no valido' });
        }
    }
}

export default new LoginController();