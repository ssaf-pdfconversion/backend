import { SOAPResponse } from "./SOAPResponse";
import { Statistics} from "../model/Statistics";

export class SOAPStatsResponse extends SOAPResponse<Statistics[]> {
    constructor(
        public success: boolean,
        public message: string,
        public stats: Statistics[],
        public timestamp: string
    ) {
        super(success, message, stats, timestamp);
    }
}