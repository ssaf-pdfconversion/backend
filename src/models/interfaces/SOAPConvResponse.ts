import ConvertedFile from "./ConvertedFile";
import { SOAPResponse } from "./SOAPResponse"

export class SOAPConvResponse extends SOAPResponse<ConvertedFile[]> {
    constructor(
        public success: boolean,
        public message: string,
        public files: ConvertedFile[],
        public timestamp: string
    ) {
        super(success, message, files, timestamp);
    }

}