import { SOAPResponse } from "./SOAPResponse";

export class SOAPDResponse extends SOAPResponse<number> {
    constructor(
        public success: boolean,
        public message: string,
        public content: number,
        public timestamp: string
    ) {
        super(success, message, content, timestamp);
    }
}