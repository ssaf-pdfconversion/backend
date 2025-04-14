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

router.get('/user', (req, res) => {
    res.send('¡Hola desde la ruta de registro!');
  });


router.post('/login', LoginController.login);
router.post('/officeConvert',  PDFController.officeConvert);
router.post('/urlConvert', PDFController.urlConvert);
router.post('/total', MetricsController.metricsTotal);
router.post('/statistics', Authenticate.validate ,MetricsController.getStatistics);


export default router;



//routes.post('/urlConvert', authenticateToken, urlConvert);
//

