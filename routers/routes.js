import {Router} from 'express';
import {login} from '../controllers/LoginController';
import {authenticateToken} from '../autheticateMiddleware';
import {officeConvert, urlConvert} from '../controllers/PDFController';
import {metrics} from '../controllers/MetricsController';

export const routes = Router();

routes.post('/logn', login);
routes.post('/officeConvert', authenticateToken, officeConvert);
routes.post('/urlConvert', authenticateToken, urlConvert);
routes.post('/metrics', authenticateToken, metrics);