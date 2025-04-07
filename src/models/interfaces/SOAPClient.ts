import soaprequest from 'easy-soap-request';
import { parseString } from 'xml2js';
import { SOAPStatsResponse } from './SOAPStatsResponse';

export class SOAPClient {
    public host: string = process.env.SOAP_HOST || 'localhost';
    public port: string = process.env.SOAP_PORT || '80';
    public readonly SOAPAction: string;

    constructor(SOAPAction: string) {
        this.SOAPAction = SOAPAction;
    }

    public getURL(): string{
        return `http://${this.host}:${this.port}/appserver?wsdl`;
    }

    public getHeaders(): any{
        return {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': this.SOAPAction
        };
    }

}
