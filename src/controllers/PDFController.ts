import { Request, Response } from "express";
import {convertOfficeToPDF} from "../models/model/PDFOfficeModel";
import { convertUrlToPDF } from "../models/model/PDFUrlModel";


class PDFController {

    public async officeConvert(req: Request, res: Response) {
        const files = req.body.files;
        const result = await convertOfficeToPDF(files);
        if (result.success) {
            res.status(200).json({ 
                message: 'Archivos convertidos a PDF' ,
                pdfs: result.content,
                timestamp: result.timestamp});
                console.log("El app-server respondio lo siguiente:" + result.message + " A las " + result.timestamp);
        } else {
            res.status(400).json({ message: 'Error al convertir archivos a PDF' });
        }
    }

    public async urlConvert(req: Request, res: Response) {
        const urls = req.body.urls;
        console.log("Si entro al controller de urlConvert");
    
        const result = await convertUrlToPDF(urls);
        console.log(result);
        if (result.success) {
            res.status(200).json({ 
                message: 'Archivo convertidos a PDF' ,
                pdfs: result.content,
                timestamp: result.timestamp});
            console.log("El app-server respondio lo siguiente:" + result.message + " A las " + result.timestamp);
        } else {
            console.log("El app-server no  respondio, pero el backend si " + Date.now());
            res.status(400).json({ message: 'Error al convertir archivo a PDF' });
            
        }
    }

}
export default new PDFController();









