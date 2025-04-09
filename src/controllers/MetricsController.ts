import { getTotalConversion } from "../models/model/MetricsTotalModel";
import { getStatistics } from "../models/model/StatisticsModel";
import { Request, Response } from "express";


class MetricsController {

    public async metricsTotal(req: Request, res: Response) {
        const userId = req.body.userId;
        const result = await getTotalConversion(userId);
        if (result.success) {
            res.status(200).json({ 
                message: 'Métricas obtenidas' ,
                data: result.content,
                timestamp: result.timestamp,});
        } else {
            res.status(400).json({ message: 'Error al obtener métricas' });
        }
    }

    public async getStatistics(req: Request, res: Response) {
        const userId = req.body.userId;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const fileTypeId = req.body.fileTypeId;
        const result = await getStatistics(userId, startDate, endDate, fileTypeId);
        if (result.success) {
            res.status(200).json({ 
                message: 'Métricas obtenidas' ,
                data: result.content,
                timestamp: result.timestamp,});
            console.log("El app-server respondio lo siguiente:" + result.message + " A las " + result.timestamp);
        } else {
            res.status(400).json({ message: 'Error al obtener métricas' });
        }
    }
}
export default new MetricsController();