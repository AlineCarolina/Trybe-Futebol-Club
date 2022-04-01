import * as cors from 'cors';
import * as express from 'express';
import loginController from './controllers/loginController';
import clubsController from './controllers/clubsController';
import matchsController from './controllers/matchsController';
import LeaderBoardController from './controllers/LeaderBoardController';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.app.use(express.json());
    this.app.use(cors());
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
      this.app.post('/login', loginController.login);
      this.app.get('/login/validate', loginController.validate);
      this.app.get('/clubs', clubsController.getClubs);
      this.app.get('/clubs/:id', clubsController.getById);
      this.app.get('/matchs', matchsController.getAll);
      this.app.post('/matchs', matchsController.create);
      this.app.patch('/matchs/:id/finish', matchsController.update);
      this.app.patch('/matchs/:id', matchsController.edit);
      this.app.get('/leaderboard/home', LeaderBoardController);
    };
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.use(express.json());
    this.app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
