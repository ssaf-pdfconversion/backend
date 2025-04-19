import { SOAPDResponse } from '../interfaces/SOAPDResponse';
import { SOAPClient } from '../interfaces/SOAPClient';
import soaprequest from 'easy-soap-request';
import { parseString } from 'xml2js';

export async function getTotalConversion(userID: number): Promise<SOAPDResponse> {
    try{
        const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.domain.app.upb.edu.co/">
            <soapenv:Header/>
            <soapenv:Body>
                <int:getTotalConversion>
                    <userId>${userID}</userId>
                </int:getTotalConversion>
            </soapenv:Body>
            </soapenv:Envelope>`;

        /*
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
                    console.log("Error en la llamada SOAP:", err);
                } else {
                    const resultado = result['S:Envelope']['S:Body']['ns2:getTotalConversionResponse']['return'];
                    resolve(resultado);
                }
            });
        });
        
       */
        const response = new SOAPDResponse(true, 'ok', 1500, new Date().toISOString());
        console.log(response);
        return response;
        

    }
    catch (error){
        console.error('Error en la llamada SOAP:', error);
              return new SOAPDResponse(false, 'Error a obtener el total de conversion', 0, new Date().toISOString());

    }
}
