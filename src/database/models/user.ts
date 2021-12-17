import { DataTypes, Model } from 'sequelize';
import { sequelizeConnection } from '../../config/database';
import bcrypt from 'bcryptjs';
export interface IUserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model<IUserAttributes> implements IUserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public token: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  validatePassword: (password: string) => boolean;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
  },
);

User.beforeSave((user) => {
  if (user.changed('password')) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  }
});

User.prototype.validatePassword = function validatePassword(password: string): boolean {
  const isMatch = bcrypt.compareSync(password, this.password);
  return isMatch;
};

export default User;
