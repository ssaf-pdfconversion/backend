import { SOAPResponse } from "./SOAPResponse"

export class SOAPBResponse extends SOAPResponse<boolean> {
    constructor(
        public success: boolean,
        public message: string,
        public content: boolean,
        public timestamp: string
    ) {
        super(success, message, content, timestamp);
    }
}
