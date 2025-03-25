import {getMetrics} from '../models/MetricsModel.js';
export const metrics = async (req, res) => {

    const result = await getMetrics();
    return res.json(result);
};