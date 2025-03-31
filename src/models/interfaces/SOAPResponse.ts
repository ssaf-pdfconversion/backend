export class SOAPResponse<T>{
    constructor(
        public success: boolean,
        public message: string,
        public content: T,
        public timestamp: string
    ) {}
}