import {Router} from 'express';
import LoginController from '../controllers/LoginController';
import RegisterController from '../controllers/RegisterController';
import PDFController from '../controllers/PDFController';
import MetricsController from '../controllers/MetricsController';
import Authenticate from '../controllers/autheticate';

const router = Router();
router.get('/', (req, res) => {
    res.send('¡Hola desde la ruta principal!');
  });

router.post('/login', LoginController.login);
router.post('/officeConvert',  PDFController.officeConvert);
router.post('/urlConvert', PDFController.urlConvert);
router.post('/total', MetricsController.metricsTotal);
router.post('/statistics', Authenticate.validate ,MetricsController.getStatistics);
router.post('/register', RegisterController.register);

export default router;



//routes.post('/urlConvert', authenticateToken, urlConvert);
//

