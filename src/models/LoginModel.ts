import * as soap from 'soap';
import { SOAPSResponse } from './interfaces/SOAPSResponse';
const url ='http://${process.env.SOAP_HOST}:${process.env.SOAP_PORT}/appserver?wsdl';

export async function loginUser<T>(username: string, password: string): Promise<SOAPSResponse> {

    try{
        const client = await soap.createClientAsync(url);
    const args = { username, password };
    const result = await client.login(args);

    const response = new SOAPSResponse(
        result.success,
        result.message,
        result.content,
        result.timestamp
    )
    return response;
    }catch(error){
        return new SOAPSResponse(false, 'Error en login', '', new Date().toISOString());
    }
    
    
    
}