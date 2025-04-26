import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SOAPClient } from '../models/model/LoginModel';

class LoginController {

    public async login(req: Request, res: Response) {

        const { username, password } = req.body;
        console.log("Si entro al controller de login");
        const soapClient = new SOAPClient();
        const result = await soapClient.loginUser(username, password);
       
        if (result.success.toString() === "true") {

            const decoded = jwt.decode(result.content) as {userId: string} | null;
            const userId = decoded ? decoded.userId : null;
            res.status(200).json({ 
                message: 'Usuario autenticado' , 
                token: result.content,
                userId: userId,
                timestamp: result.timestamp,
            });

            console.log("El app-server respondio lo siguiente:" + result.message + " A las " + result.timestamp);
        } else {
            res.status(401).json({ message: 'Este es un mensaje de prueba' });
        }
    }

    


    
}

export default new LoginController();