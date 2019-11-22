import express from 'express';

import { ConfigServer } from './config';
import Typeorm from './db/typeorm';
import { PORT } from './constants';

const configAndStartServers = async () => {
  await Typeorm.connect();

  const app = express();

  ConfigServer(app);

  const port = PORT;
  app.listen(port, () => console.log(`Server is listening on ${port}`));
};

configAndStartServers();
