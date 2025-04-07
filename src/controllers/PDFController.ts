import { Request, Response } from "express";
import {SOAPClientPDF } from "../models/model/PDFOfficeModel";


class PDFController {

    public async officeConvert(req: Request, res: Response) {
        const files = req.body.files;
        const soapClient = new SOAPClientPDF();
        const result = await soapClient.convertOfficeToPDF(files);
        console.log(result);
        if (result) {
            res.status(200).json({ 
                message: 'Archivos convertidos a PDF' ,
                pdfs: result.content,
                timestamp: result.timestamp});
        } else {
            res.status(400).json({ message: 'Error al convertir archivos a PDF' });
        }
    }

}
export default new PDFController();









