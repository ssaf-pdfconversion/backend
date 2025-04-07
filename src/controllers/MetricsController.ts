import { getTotalConversion } from "../models/model/MetricsModel";
import { Request, Response } from "express";


class MetricsController {

    public async metrics(req: Request, res: Response) {
        const userId = req.body.userId;
        const result = await getTotalConversion(userId);
        if (result) {
            res.status(200).json({ message: 'Métricas obtenidas' });
        } else {
            res.status(400).json({ message: 'Error al obtener métricas' });
        }
    }
}
export default new MetricsController();