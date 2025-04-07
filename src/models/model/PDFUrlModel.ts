import soaprequest from 'easy-soap-request';
import { parseString } from 'xml2js';
import { SOAPASResponse } from '../interfaces/SOAPASResponse';

export class SOAPClientUrlPDF {
    private  url: string;
    private headers: any;
    
    constructor(host: string = process.env.SOAP_HOST || 'localhost', port: string = process.env.SOAP_PORT || '80') {
        this.url = `http://${host}:${port}/appserver?wsdl`;
        this.headers = {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': 'getURLConversion'
            };
    }

    public async convertUrlToPDF(urls: string[]): Promise<SOAPASResponse> { 
        try{

            const urlsXML = urls.map(filePath => {
                
                return `<urls>${filePath}</urls>`;
                }).join('');
        

            const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.domain.app.upb.edu.co/">
                <soapenv:Header/>
                <soapenv:Body>
                    <int:getURLConversion>
                        ${urlsXML}
                    </int:getURLConversion>
                </soapenv:Body>
                </soapenv:Envelope>`;

            const { response } = await soaprequest({
                url: this.url,
                headers: this.headers,
                xml,
                timeout: 5000 // Optional timeout in milliseconds
            });
            const { body} = response;

            return new Promise((resolve, reject) => {
                parseString(body, { explicitArray: false }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        const resultado = result['S:Envelope']['S:Body']['ns2:getURLConversion']['return'];
                        resolve(resultado);
                    }
                    });
                });

        }
        catch (error){
            console.error('Error en la llamada SOAP:', error);
                return new SOAPASResponse(false, 'Error convertir a url', [], new Date().toISOString());

        }
    }

}