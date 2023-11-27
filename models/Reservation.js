const { DataTypes } = require("sequelize");
const database = require("../config/DBConnection").dbConnection;

const Reservation = database.define(
  "Reservation",
  {
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    vehicle_no: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mileage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "vehicle_service",
    timestamps: false, 
  }
);

module.exports = Reservation;
