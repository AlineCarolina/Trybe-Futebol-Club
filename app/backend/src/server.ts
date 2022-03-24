import { App } from './app';
import 'dotenv/config';

const PORT = process.env.PORT || 3001 || 3002;

new App().start(PORT);
