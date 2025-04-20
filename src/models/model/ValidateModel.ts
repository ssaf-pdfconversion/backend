import { parseString } from 'xml2js';
import soaprequest from 'easy-soap-request';
import { SOAPBResponse } from '../interfaces/SOAPBResponse';
import { SOAPClient } from '../interfaces/SOAPClient';


export async function validate(token: string): Promise<SOAPBResponse> {
    try {
        const xml = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.domain.app.upb.edu.co/">
            <soapenv:Header/>
            <soapenv:Body>
                <int:validate>
                    <jwt>${token}</jwt>
                </int:validate>
            </soapenv:Body>
            </soapenv:Envelope>
        `;

        const soapClient = new SOAPClient("validate");
        
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
                    console.error('Error parsing XML:', err);
                } else {
                    const hola = result['S:Envelope']['S:Body']['ns2:validateResponse']['return'];
                    console.log(hola);
                    resolve(hola);
                }
            });
        });
        /*
        console.log("Entro a validate del modelo");
        const response = new SOAPBResponse(true, 'Usuario autenticado', true, new Date().toISOString());
        return response;
        */
        
    } catch (error) {
        console.error('Error en la llamada SOAP:', error);
        return new SOAPBResponse(false, 'Error en validate', false, new Date().toISOString());
    }
}