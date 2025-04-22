import {Router} from 'express';
import RegisterController from '../controllers/RegisterController';
import PDFController from '../controllers/PDFController';
import MetricsController from '../controllers/MetricsController';
import Authenticate from '../controllers/autheticate';
import LoginController from '../controllers/LoginController';

const router = Router();
router.get('/', (req, res) => {
    res.send('¡Hola desde la ruta principal!');
  });



router.post('/login', LoginController.login);
router.post('/officeConvert',  Authenticate.validate, PDFController.officeConvert);
router.post('/urlConvert',Authenticate.validate, PDFController.urlConvert);
router.post('/total',Authenticate.validate, MetricsController.metricsTotal);
router.post('/statistics', Authenticate.validate ,MetricsController.getStatistics);
router.post('/register', RegisterController.registerdos);


export default router;



//routes.post('/urlConvert', authenticateToken, urlConvert);
//

