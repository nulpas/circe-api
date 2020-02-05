import { DataTypes, Model, ModelAttributes } from 'sequelize';

export default class Activities extends Model {
  public static readonly attributes: ModelAttributes = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  };

  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
