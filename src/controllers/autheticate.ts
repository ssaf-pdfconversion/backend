import { Request, Response } from 'express';
import { validate } from '../models/model/ValidateModel';


class Authenticate{
  
    public async validate(req: Request, res: Response, next: Function): Promise<void> {
        const header = req.header('Authorization');
        if(header == undefined){
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const result = await validate(header);
        if (result.success.toString() === "true") {
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        } 
    }
}

export default new Authenticate();