import soaprequest from 'easy-soap-request';
import { parseString } from 'xml2js';
import { SOAPConvResponse } from '../interfaces/SOAPConvResponse';
import { base64array } from './base64';
import { SOAPClient } from '../interfaces/SOAPClient';


export async function convertOfficeToPDF(files: string[], userId: number, names: string[]): Promise<SOAPConvResponse> {
  try {
    const filesXml = files
    .map((b64, i) => `
                    <files>
                        <fileBase64>${b64}</fileBase64>
                        <fileName>${names[i]}</fileName>
                    </files>`)
    .join('');
   
    const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.domain.app.upb.edu.co/">
            <soapenv:Header/>
            <soapenv:Body>
                <int:getOfficeConversion>
                    <userId>${userId}</userId>${filesXml}
                </int:getOfficeConversion>
            </soapenv:Body>
            </soapenv:Envelope>`;

    
    console.log("El archivo xml es: " + xml);
    const soapClient = new SOAPClient('getOfficeConversion');

    const { response } = await soaprequest({
      url: soapClient.getURL(),
      headers: soapClient.getHeaders(),
      xml,
      timeout: 1000000 // Optional timeout in milliseconds
    });
    const { body} = response;

    return new Promise((resolve, reject) => {
      parseString(body, { explicitArray: false }, (err, result) => {
        if (err) {
          reject(err);
          console.log("Error en la llamada SOAP:", err);
        } else {
          const resultado = result['S:Envelope']['S:Body']['ns2:getOfficeConversionResponse']['return'];
          console.log(resultado);
          resolve(resultado);
        }
      });
    });
    /*
    const response = new SOAPASResponse(true, 'ok', base64array, new Date().toISOString());
    return response;
    */

  }
  catch (error) {
    console.error('Error en la llamada SOAP:', error);
    return new SOAPConvResponse(false, 'Error convertir a url', [], new Date().toISOString());

  }
}

