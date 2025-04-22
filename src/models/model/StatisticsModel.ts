import { SOAPStatsResponse } from '../interfaces/SOAPStatsResponse';
import { SOAPClient } from '../interfaces/SOAPClient';
import soaprequest from 'easy-soap-request';
import { parseString } from 'xml2js';

export async function getStatistics(userId: number, 
    startDate: string,
    endDate: string,
    fileTypeId: number):
    Promise<SOAPStatsResponse> {
    try{
        const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.domain.app.upb.edu.co/">
        <soapenv:Header/>
        <soapenv:Body>
            <int:getStatistics>
                <userId>${userId}</userId>
                <filter>
                    <startDate>${startDate}</startDate>
                    <endDate>${endDate}</endDate>
                    <!--Optional:-->
                    <fileTypeId>${fileTypeId}</fileTypeId>
                </filter>
            </int:getStatistics>
        </soapenv:Body>
        </soapenv:Envelope>`;

        const soapClient = new SOAPClient("getStatistics");
        console.log(soapClient.getURL());
        console.log(soapClient.getHeaders());
        
        
        const { response } = await soaprequest({
            url: soapClient.getURL(),
            headers: soapClient.getHeaders(),
            xml,
            timeout: 5000 // Optional timeout in milliseconds
        });
        const { body} = response;

        return new Promise((resolve, reject) => {
            parseString(body, { explicitArray: false }, (err, result) => {
                if (err) {
                    reject(err);
                    console.log("Error en la llamada SOAP:", err);
                } else {
                    const resultado = result['S:Envelope']['S:Body']['ns2:getStatisticsResponse']['return'];
                    console.log(resultado);
                    resolve(resultado);
                }
            });
        });
        
        
        /*
       
        const response = new SOAPStatsResponse(true, 'ok', [1,2,3,4], new Date().toISOString());
        console.log(response);
        return response;
        
        */
    }
    catch (error){
        console.error('Error en la llamada SOAP:', error);
              return new SOAPStatsResponse(false, 'Error a obtener la estadisticas', [], new Date().toISOString());

    }
}
