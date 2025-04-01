import * as soap from 'soap';
import { SOAPSResponse } from './interfaces/SOAPSResponse';
import http from 'http';

export async function loginUser<T>(username: string, password: string): Promise<SOAPSResponse> {
    
    try{
        const url =`http://${process.env.SOAP_HOST}:${process.env.SOAP_PORT}/appserver?wsdl`;
        console.log("Si entro al modelo de login");
        console.log(url);
        const agent = new http.Agent({ keepAlive: false });

        const options = {
            wsdl_options: {
              timeout: 50000,             // Timeout in milliseconds
              strictSSL: false,          // Disable strict SSL validation
              rejectUnauthorized: false,
              agent // Allow self-signed certificates
            },
          };
        const client = await soap.createClientAsync(url, options);
        const args = { username, password };
        
        const result = await client.login(args);

        const response = new SOAPSResponse(
            result.success,
            result.message,
            result.content,
            result.timestamp
        )

    console.log(result.message);
    return response;
    }catch(error){
        console.error('Error en la llamada SOAP:', error);
        return new SOAPSResponse(false, 'Error en login', '', new Date().toISOString());
    }
      
}