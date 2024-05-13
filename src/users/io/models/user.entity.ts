/* eslint-disable no-use-before-define */
import {
    CreationOptional, InferAttributes, InferCreationAttributes, DataTypes
} from 'sequelize';
import {
    Table, Column, Model
} from 'sequelize-typescript';

import { IUser } from '@app/users/types';

@Table({ tableName: 'tb_users', modelName: 'tbUsers' })
export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> implements IUser {
    @Column({ type: DataTypes.NUMBER, primaryKey: true })
        id: CreationOptional<number>;
    @Column
        name: string;
    @Column(DataTypes.JSON)
        roles: string[];
    @Column
        isActive: boolean;
    @Column({ type: DataTypes.STRING, unique: true })
        email: string;
    @Column
        password: string;
}
