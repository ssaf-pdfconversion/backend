import { SOAPSResponse } from "../interfaces/SOAPSResponse";
import soaprequest from 'easy-soap-request';
import { parseString } from 'xml2js';
import { SOAPClient } from "../interfaces/SOAPClient";

export async function registerUser(username: string,
    password: string, 
    nombre: string, 
    apellido: string, 
    email: string): Promise<SOAPSResponse>{
    try{

        const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.domain.app.upb.edu.co/">
            <soapenv:Header/>
            <soapenv:Body>
                <int:register>
                    <username>${username}</username>
                    <password>${password}</password>
                    <nombre>${nombre}</nombre>
                    <apellido>${apellido}</apellido>
                    <email>${email}</email>
                </int:register>
            </soapenv:Body>
            </soapenv:Envelope>`;

        const soapClient = new SOAPClient("register");
    
        
        
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
                    const resultado = result['S:Envelope']['S:Body']['ns2:registerResponse']['return'];
                    resolve(resultado);
                }
                });
            });
          */  
         
        const response = new SOAPSResponse(true, 'ok', 'asdfghjj', new Date().toISOString());
        return response;
           */ 

    }
    catch (error){
        console.error('Error en la llamada SOAP:', error);
              return new SOAPSResponse(false, 'Error convertir a url', '', new Date().toISOString());
    }


}