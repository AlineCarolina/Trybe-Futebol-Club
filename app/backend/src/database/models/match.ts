import { Model, DataTypes } from 'sequelize';
import db from '.';
import Club from './clubs';

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
  tableName: 'matchs',
  underscored: true,
  sequelize: db,
  modelName: 'Matchs',
  timestamps: false,
});

Match.belongsTo(Club, { foreignKey: 'home_team', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'away_team', as: 'awayClub' });

export default Match;
