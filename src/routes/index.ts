import { Router } from 'express';

import orphanagesRouter from './orphanages.routes';

const Routes = Router();

Routes.use('/orphanages', orphanagesRouter);

export default Routes;
