import { Model, DataTypes } from 'sequelize';
import db from '.';

class Match extends Model {
  public id: number;

  public homeTeam: string;

  public homeTeamGoals: number;

  public awayTeam: string;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  home_team: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  home_team_goals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },

  away_team: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  away_team_goals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },

  in_progress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

}, {
  tableName: 'matchs',
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  timestamps: false,
});

export default Match;
