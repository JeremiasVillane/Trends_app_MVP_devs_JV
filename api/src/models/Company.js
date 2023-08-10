const { DataTypes } = require("sequelize");
const {
  encryptPassword,
  decryptPassword,
} = require("../helpers/encryptPassword");
const { DEFAULT_IMG } = require("../../config");
const isImageUrlOrLocalPath = require("../helpers/isImageUrlOrLocalPath");

module.exports = (sequelize) => {
  const Company = sequelize.define(
    "company",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      website: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
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
      name: {
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
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: DEFAULT_IMG,
        validate: {
          isImageUrlOrLocalPath: (value) => {
            if (!isImageUrlOrLocalPath(value)) {
              throw new Error("Invalid image URL or local path format.");
            }
          },
        },
        set(value) {
          this.setDataValue("image", value || DEFAULT_IMG);
        },
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      // timestamps: false,
      scopes: {
        withoutId: {
          attributes: { exclude: ["id"] },
        },
        withoutPassword: {
          attributes: { exclude: ["password"] },
        },
      },
    }
  );

  Company.beforeSave(async (company) => {
    if (company.changed("password"))
      company.password = await encryptPassword(company.password);
  });

  Company.prototype.comparePassword = async function (password) {
    return await decryptPassword(password, this.password);
  };

  return Company;
};
