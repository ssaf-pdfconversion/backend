import { Statistics } from "../models/model/Statistics";
import { stringToFloat } from "./number";
export interface NumericStat {
    totalMB: number;
    date: string;
}



export function mapStatisticsToNumeric(statistics: Statistics): NumericStat[] {
    return statistics.stat.map((item => {
        const mb = stringToFloat(item.totalMB);
        if (mb === null){
            throw new Error(`Invalid number format: ${item.totalMB}`);
        }
        return {
            totalMB: mb,
            date: item.date
        }
    }))



}