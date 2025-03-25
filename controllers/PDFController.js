import { convertOfficeToPDF, convertURLToPDF } from '../models/PDFModel.js';

export const officeConvert = async (req, res) => {
    const files = req.body;
    const result = await convertOfficeToPDF(files);
};

export const urlConvert = async (req, res) => {
    const url = req.body;
    const result = await convertURLToPDF(url);
}