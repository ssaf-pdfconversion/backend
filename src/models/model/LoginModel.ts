
import { SOAPSResponse } from '../interfaces/SOAPSResponse';
import soaprequest from 'easy-soap-request';
import { parseString } from 'xml2js';
import jwt from 'jsonwebtoken';

export class SOAPClient {
  private  url: string;
  private headers: any;
  
  constructor(host: string = process.env.SOAP_HOST || 'localhost', port: string = process.env.SOAP_PORT || '80') {
    this.url = `http://${host}:${port}/appserver?wsdl`;
    this.headers = {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'login'
      };
  }

  public async loginUser(username: string, password: string): Promise<SOAPSResponse> {
    try {
        const xml = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interfaces.domain.app.upb.edu.co/">
            <soapenv:Header/>
            <soapenv:Body>
                <int:login>
                    <username>${username}</username>
                    <password>${password}</password>
                </int:login>
            </soapenv:Body>
            </soapenv:Envelope>
        `;


        
        const { response } = await soaprequest({
            url: this.url,
            headers: this.headers,
            xml,
            timeout: 5000 
        });

       
        const { body, statusCode } = response;
        console.log("El status code es: " + statusCode);
    
        return new Promise((resolve, reject) => {
          parseString(body, { explicitArray: false }, (err, result) => {
            if (err) {
              reject(err);
            } else {
              console.log('Parsed XML:', result);
              const resultado = result['S:Envelope']['S:Body']['ns2:loginResponse']['return'];

              resolve(resultado);
            }
          });
        });
        
      
       
        /*

      const token = this.Token(username);
      const response = new SOAPSResponse(true, 'Usuario autenticado', token, new Date().toISOString());
      return response;
      */

    } catch (error) {
      console.error('Error en la llamada SOAP:', error);
      return new SOAPSResponse(false, 'Error en login', '', new Date().toISOString());
    }
  }

  public Token(username: string){

    const payload = {
        userId: 1,
        username: username,
        role: 'admin'
    }
    const secretKey = 'aaaaaaaakkkkkkkkkssssssssssssss'; // Cambia esto por tu clave secreta
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); 
    return token

}


}
