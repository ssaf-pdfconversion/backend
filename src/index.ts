import express from 'express';
import routes from './routers/routes';
import * as dotenv from 'dotenv';

// Carga las variables de entorno definidas en el archivo .env
dotenv.config();

const app = express();
const port = 2424;

// Middleware para parsear JSON
app.use(express.json({limit: '50mb'})); // Aumenta el límite de tamaño del cuerpo a 50 MB
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Aumenta el límite de tamaño del cuerpo a 50 MB



app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
// Ruta principal
app.use('/', routes);
app.use('/user', routes);


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
});
