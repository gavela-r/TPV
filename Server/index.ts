import express from 'express';
import { obtenerProductos } from './modelo/DAO/producto';
import { obtenerTarjetaRegalo } from './modelo/DAO/tarjetaRegalo';
import { obtenerPromocionPropia } from './modelo/DAO/promocionPropia';

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.use(express.json());
app.get('/productos', obtenerProductos);
app.get('/tarjetas_regalos', obtenerTarjetaRegalo);
app.get('/promocionPropia', obtenerPromocionPropia);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
