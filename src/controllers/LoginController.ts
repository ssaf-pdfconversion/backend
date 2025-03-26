import { Request, Response } from 'express';
import { loginUser } from '../models/LoginModel';

class LoginController {

    public async login(req: Request, res: Response) {
        const { username, password } = req.body;
        const result = await loginUser(username, password);
        if (result) {
            res.status(200).json({ message: 'Usuario autenticado' });
        } else {
            res.status(401).json({ message: 'Usuario no autenticado' });
        }
    }
}

export default new LoginController();