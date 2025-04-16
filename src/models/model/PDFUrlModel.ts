import soaprequest from 'easy-soap-request';
import { parseString } from 'xml2js';
import { SOAPASResponse } from '../interfaces/SOAPASResponse';
import { base64array } from './base64';
import { SOAPClient } from '../interfaces/SOAPClient';

export async function convertUrlToPDF(urls: string[]): Promise<SOAPASResponse> {
    try {

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
        
        /*
        const soapClient = new SOAPClient("getURLConversion");
    
        const { response } = await soaprequest({
            url: soapClient.getURL(),
            headers: soapClient.getHeaders(),
            xml,
            timeout: 5000 // Optional timeout in milliseconds
        });
        const { body } = response;

        return new Promise((resolve, reject) => {
            parseString(body, { explicitArray: false }, (err, result) => {
                if (err) {
                    reject(err);
                    console.log("Error en la llamada SOAP:", err);
                } else {
                    const resultado = result['S:Envelope']['S:Body']['ns2:getURLConversionResponse']['return'];
                    resolve(resultado);
                }
            });
        });
    */
        
        const response = new SOAPASResponse(true, 'ok', base64array, new Date().toISOString());
        return response;

    }
    catch (error) {
        console.error('Error en la llamada SOAP:', error);
        return new SOAPASResponse(false, 'Error convertir a url', [], new Date().toISOString());

    }
}

