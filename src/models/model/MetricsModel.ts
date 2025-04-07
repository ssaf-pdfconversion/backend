import { SOAPStatsResponse } from '../interfaces/SOAPStatsResponse';
import { SOAPClient } from '../interfaces/SOAPClient';
import soaprequest from 'easy-soap-request';
import { parseString } from 'xml2js';

export async function getTotalConversion(userID: number): Promise<SOAPStatsResponse> {
    try{

        const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.domain.app.upb.edu.co/">
            <soapenv:Header/>
            <soapenv:Body>
                <int:getTotalConversion>
                    <userId>${userID}</userId>
                </int:getTotalConversion>
            </soapenv:Body>
            </soapenv:Envelope>`;

        const soapClient = new SOAPClient("getTotalConversion");
        
        const { response } = await soaprequest({
            url: soapClient.getURL(),
            headers: soapClient.getHeaders(),
            xml,
            timeout: 5000 // Optional timeout in milliseconds
        });
        const { body} = response;
        console.log(response);

        return new Promise((resolve, reject) => {
            parseString(body, { explicitArray: false }, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const resultado = result['S:Envelope']['S:Body']['ns2:getTotalConversion']['return'];
                    resolve(resultado);
                }
            });
        });

    }
    catch (error){
        console.error('Error en la llamada SOAP:', error);
              return new SOAPStatsResponse(false, 'Error a obtener el total de conversion', [], new Date().toISOString());

    }
}
