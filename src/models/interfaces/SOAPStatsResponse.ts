import { SOAPResponse } from "./SOAPResponse";
import { Statistics } from '../model/Statistics';

export class SOAPStatsResponse extends SOAPResponse<Statistics> {
    constructor(
        public success: boolean,
        public message: string,
        public content: Statistics,
        public timestamp: string
    ) {
        super(success, message, content, timestamp);
    }
}