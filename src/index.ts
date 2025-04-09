import express from 'express';
import routes from './routers/routes';
import * as dotenv from 'dotenv';


dotenv.config();

const app = express();
const port = 2424;


app.use(express.json());


app.use('/', routes);


app.listen(port, () => {
  console.log(`Servidor corriendo en http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
});
