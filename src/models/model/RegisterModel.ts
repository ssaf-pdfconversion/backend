import { SOAPSResponse } from "../interfaces/SOAPSResponse";
import soaprequest from 'easy-soap-request';
import { parseString } from 'xml2js';

export class SOAPclientReg{
    private  url: string;
    private headers: any;
    
    constructor(host: string = process.env.SOAP_HOST || 'localhost', port: string = process.env.SOAP_PORT || '80') {
        this.url = `http://${host}:${port}/appserver?wsdl`;
        this.headers = {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': 'register'
        };
    }

    public async register(username: string, 
        password: string, 
        nombre: string, 
        apellido: string, 
        email: string): Promise<SOAPSResponse> { 
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

            const { response } = await soaprequest({
                url: this.url,
                headers: this.headers,
                xml,
                timeout: 5000
            });
            const { body } = response;
            console.log(response);

            return new Promise((resolve, reject) => {
                parseString(body, { explicitArray: false }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        const resultado = result['S:Envelope']['S:Body']['ns2:registerResponse']['return'];
                        resolve(resultado);
                    }
                    });
                });

        }
        catch (error){
            console.error('Error en la llamada SOAP:', error);
                  return new SOAPSResponse(false, 'Error convertir a url', '', new Date().toISOString());

        }
    }
}