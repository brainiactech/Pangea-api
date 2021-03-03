import path from 'path';
import gateway from 'express-gateway';
import './publisher/index';
import './subscribers/index';

gateway()
  .load(path.join(__dirname, 'config'))
  .run();
