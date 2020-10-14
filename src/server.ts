import "reflect-metadata";
import express, { json } from 'express';

import './database/connection';

import Routes from './routes';

const app = express();

const port = process.env.PORT || 3333;

app.use(json());

app.use(Routes);

app.listen(port, () => console.log(`Server running on port ${port}.`));
