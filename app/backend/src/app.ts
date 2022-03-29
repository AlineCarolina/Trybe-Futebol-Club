import * as express from 'express';
import loginController from './controllers/loginController';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.app.use(express.json());
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.use(express.json());
    this.app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
    this.app.post('/login', loginController);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
