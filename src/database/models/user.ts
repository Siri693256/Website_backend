import { DataType,DataTypes,Model,Optional } from "sequelize";
import sequelizeConnection from "../config";

interface userAttributes {
    id : number;
    name : string;
    age : number;
    email : string;
    password : string;
    is_deleted : boolean;
    created_at : Date;
    updated_at : Date;
    deleted_at : Date;
}
export interface userInput extends Optional<userAttributes, "id"> {}
export interface userOutput extends Required<userAttributes>{}

class user extends Model<userAttributes, userInput> implements userAttributes {
    public id! : number;
    public name! : string;
    public age! : number;
    public email!: string;
    public password!: string;
    public is_deleted!: boolean;

    //timestamps
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
    public readonly deleted_at!: Date;
}
user.init ({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE, 
    allowNull: false,
    defaultValue: DataTypes.NOW,
    },
    deleted_at: {
        type: DataTypes.DATE, 
    allowNull: true,
    }
},
    {
        timestamps:true,
        paranoid:true,
        sequelize:sequelizeConnection
    }
)

export default user;