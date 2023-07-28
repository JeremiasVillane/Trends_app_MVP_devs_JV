const { DataTypes } = require("sequelize");
const {
  encryptPassword,
  decryptPassword,
} = require("../helpers/encryptPassword");
const { DEFAULT_IMG } = require("../../config");

module.exports = (sequelize) => {
  const Company = sequelize.define("company", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 55],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 33],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cuit: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        is: /^[0-9]+$/,
        len: [7, 13],
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: DEFAULT_IMG,
      validate: { isUrl: true },
      set(value) {
        // Si el valor es un string vacío, lo convierte a null
        this.setDataValue("image", value || DEFAULT_IMG);
      },
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Company.beforeSave(async (company) => {
    if (company.changed("password"))
      company.password = await encryptPassword(company.password);
  });

  Company.prototype.comparePassword = async function (password) {
    return await decryptPassword(password, this.password);
  };

  return Company;
};