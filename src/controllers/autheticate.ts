import { Request, Response } from 'express';
import { validate } from '../models/model/ValidateController';


class Authenticate{
  
    public async validate(req: Request, res: Response, next: Function): Promise<void> {
        const header = req.header('Authorization');
        if(header == undefined){
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const token = header.split(' ')[1];
        const result = await validate(token);
        if (result.success) {
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        } 
    }
}

export default new Authenticate();