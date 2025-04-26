import { SOAPResponse } from "./SOAPResponse";
import { Statistics} from "../model/Statistics";

export class SOAPResponseT<T>{
    constructor(
        public success: string,
        public message: string,
        public content: T,
        public timestamp: string
    ) {}
}
export class SOAPStatsResponse extends SOAPResponseT<Statistics[]> {
    constructor(
        public success: string,
        public message: string,
        public stats: Statistics[],
        public timestamp: string
    ) {
        super(success, message, stats, timestamp);
    }
}

