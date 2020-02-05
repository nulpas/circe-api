import { DataTypes, Model, ModelAttributes } from 'sequelize';

export default class Users extends Model {
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
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  };

  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
