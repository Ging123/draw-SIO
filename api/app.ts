require('dotenv').config();
import connectToMoongo from './src/configs/moongose';
import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();
const port = process.env.SERVER_PORT! || 8000;

app.use(cors({
  origin:process.env.CLIENT_URL!,
  credentials:true
}));
app.use(bodyParser.json());
app.use(routes);

!(async function config() {
  try {
    const message = `The server start in the port ${port}`;
    await connectToMoongo();
    app.listen(port, () => console.log(message));
  }
  catch(err:unknown) {
    console.log(err);
  }
})(); 