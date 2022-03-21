import { Model, DataTypes } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Clubs extends Model {
  // public <campo>!: <tipo>;

  public id: number;

  public clubName: string;
}

Clubs.init({
  // ... Campos

  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  club_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  // ... Outras configs
  tableName: 'clubs',
  underscored: true,
  sequelize: db,
  modelName: 'Clubs',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Clubs;
