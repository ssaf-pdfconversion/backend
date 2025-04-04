import { Request, Response } from "express";
import { convertOfficeToPDF, convertURLToPDF, SOAPClientPDF } from "../models/PDFModel";


class PDFController {

    public async officeConvert(req: Request, res: Response) {
        const files = req.body.files;
        const soapClient = new SOAPClientPDF();
        const result = await soapClient.convertOfficeToPDF(files);
        console.log(result);
        if (result) {
            res.status(200).json({ message: 'Archivos convertidos a PDF' });
        } else {
            res.status(400).json({ message: 'Error al convertir archivos a PDF' });
        }
    }

    public async urlConvert(req: Request, res: Response) {
        const urls = req.body.urls;
        const result = await convertURLToPDF(urls);
        if (result) {
            res.status(200).json({ message: 'URLs convertidas a PDF' });
        } else {
            res.status(400).json({ message: 'Error al convertir URLs a PDF' });
        }
    }
}
export default new PDFController();









