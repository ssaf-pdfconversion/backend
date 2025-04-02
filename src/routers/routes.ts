import {Router} from 'express';
import LoginController from '../controllers/LoginController';
//import {authenticateToken} from '../autheticateMiddleware';
import PDFController from '../controllers/PDFController';
import MetricsController from '../controllers/MetricsController';

const router = Router();
router.get('/', (req, res) => {
    res.send('¡Hola desde la ruta principal!');
  });

router.post('/login', LoginController.login);
router.post('/officeConvert',  PDFController.officeConvert);
router.post('/urlConvert',  PDFController.urlConvert);
router.post('/metrics', MetricsController.metrics);
router.post('/validate', LoginController.validate);
export default router;



//routes.post('/urlConvert', authenticateToken, urlConvert);
//

