import { Model, DataTypes } from 'sequelize';
import db from '.';

class Match extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

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
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Clubs',
      key: 'id',
    },
  },

  home_team_goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  away_team: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Clubs',
      key: 'id',
    },
  },

  away_team_goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  in_progress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },

}, {
  tableName: 'matches',
  underscored: true,
  sequelize: db,
  modelName: 'Matches',
  timestamps: false,
});

export default Match;
