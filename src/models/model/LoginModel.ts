
import { SOAPSResponse } from '../interfaces/SOAPSResponse';
import soaprequest from 'easy-soap-request';
import { parseString } from 'xml2js';
import { SOAPBResponse }  from '../interfaces/SOAPBResponse';

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

    } catch (error) {
      console.error('Error en la llamada SOAP:', error);
      return new SOAPSResponse(false, 'Error en login', '', new Date().toISOString());
    }
  }


  public async validate(token: string): Promise<SOAPBResponse> {
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

        const { response } = await soaprequest({
            url: this.url,
            headers: this.headers,
            xml,
            timeout: 5000 // Optional timeout in milliseconds
        });
        const { body } = response;
        
        return new Promise((resolve, reject) => {
          parseString(body, { explicitArray: false }, (err, result) => {
            if (err) {
              reject(err);
            } else {
                const hola = result['S:Envelope']['S:Body']['ns2:validateResponse']['return'];
                console.log(hola);
              resolve(hola);
            }
          });
        });
    } catch (error) {
      console.error('Error en la llamada SOAP:', error);
      return new SOAPBResponse(false, 'Error en validate', false, new Date().toISOString());
    }
  }

}
