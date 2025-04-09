import { Request, Response } from 'express';
import { validate } from '../models/model/ValidateModel';


class Authenticate{
  
    public async validate(req: Request, res: Response, next: Function): Promise<void> {
        const header = req.header('Authorization');
        console.log("Header: " + header);
        if(header == undefined){
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const token = header.split(' ')[1];
        console.log("Token: " + token);
        const result = await validate(token);
        if (result.success) {
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        } 
    }
}

export default new Authenticate();