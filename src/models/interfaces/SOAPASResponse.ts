import { SOAPResponse } from "./SOAPResponse"

export class SOAPASResponse extends SOAPResponse<string[]> {
    constructor(
        public success: boolean,
        public message: string,
        public content: string[],
        public timestamp: string
    ) {
        super(success, message, content, timestamp);
    }

}