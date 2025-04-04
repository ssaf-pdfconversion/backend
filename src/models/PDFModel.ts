import soaprequest from 'easy-soap-request';
import { parseString } from 'xml2js';
import { SOAPASResponse } from './interfaces/SOAPASResponse';
import fs from 'fs';

export async function convertOfficeToPDF(files: string[]): Promise<boolean> {
    return true;
}
export async function convertURLToPDF(urls: string[]): Promise<boolean> {
    return true;
}


export class SOAPClientPDF {
    private  url: string;
    private headers: any;
    
    constructor(host: string = process.env.SOAP_HOST || 'localhost', port: string = process.env.SOAP_PORT || '80') {
      this.url = `http://${host}:${port}/appserver?wsdl`;
      this.headers = {
          'Content-Type': 'text/xml;charset=UTF-8',
          // The SOAPAction header may need to match what your SOAP service expects.
          // Here we're setting it to "login", but adjust as needed.
          'SOAPAction': 'getOfficeConversion'
        };
    }

    public async convertOfficeToPDF(files: string[]): Promise<SOAPASResponse> { 
        try{

            const filesXML = files.map(filePath => {
                
                return `<files>${filePath}</files>`;
              }).join('');
        
            console.log(filesXML)
        
            const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.domain.app.upb.edu.co/">
            <soapenv:Header/>
            <soapenv:Body>
                <int:getOfficeConversion>
                    ${filesXML}
                </int:getOfficeConversion>
            </soapenv:Body>
            </soapenv:Envelope>`;

            const { response } = await soaprequest({
                url: this.url,
                headers: this.headers,
                xml,
                timeout: 5000 // Optional timeout in milliseconds
            });
            const { body, statusCode } = response;
            console.log(response);

            return new Promise((resolve, reject) => {
                parseString(body, { explicitArray: false }, (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    //console.log('Parsed XML:', result);
                    //console.log(result['S:Envelope']['S:Body']['ns2:loginResponse']['return']);
                   const resultado = result['S:Envelope']['S:Body']['ns2:getOfficeConversionResponse']['return'];
                   
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