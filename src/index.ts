import express from 'express';
import routes from './routers/routes';
import * as dotenv from 'dotenv';

// Carga las variables de entorno definidas en el archivo .env
dotenv.config();

const app = express();
const port = 2424;

// Middleware para parsear JSON
app.use(express.json());

// Ruta principal
app.use('/', routes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
});
