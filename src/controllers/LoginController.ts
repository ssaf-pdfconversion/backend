import { Request, Response } from 'express';
import { loginUser } from '../models/LoginModel';

class LoginController {

    public async login(req: Request, res: Response) {
        const { username, password } = req.body;
        console.log("Si entro al controller de login");
        const result = await loginUser(username, password);
        if (result.success) {
            res.status(200).json({ 
                message: 'Usuario autenticado' 
                , token: result.content});
        } else {
            res.status(401).json({ message: 'Usuario no autenticado' });
        }
    }
}

export default new LoginController();