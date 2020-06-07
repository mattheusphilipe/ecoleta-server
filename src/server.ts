import express from 'express';
import routes from './routes';
import path from 'path'
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json())
app.use(routes);

// jeito de acesar arquivos estaticos como imaens no sistea via rota
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
// A rota não vive sem o request param, ele é obrigatoório, valores que ficam no meio da rota separados por /
//Têm também o queryParam, ele é opcional, e são values após o ? na rota
// Request body  corpo da requisição, dados apra criação e atualização de informações, como dados de um usuário



app.listen(process.env.PORT || 3232);