import express from 'express';
import routes from './routers/routes';

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta principal
app.use('/', routes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
