const { DataTypes } = require("sequelize");
const {
  encryptPassword,
  decryptPassword,
} = require("../helpers/encryptPassword");
const { DEFAULT_IMG } = require("../../config");
const isImageUrlOrLocalPath = require("../helpers/isImageUrlOrLocalPath");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "user",
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 55],
        },
      },
      status: {
        type: DataTypes.STRING, // online, offline, busy, invisible
        defaultValue: "online",
      },
      kind: {
        type: DataTypes.STRING, // new, incomplete, full
        defaultValue: "new",
      },
      profile_bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      profile_birth: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [10, 10],
        },
      },
      profile_image: {
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
          this.setDataValue("profile_image", value || DEFAULT_IMG);
        },
      },
      profile_city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile_country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile_support: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      academic_formation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      academic_institution: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      academic_level: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      academic_area: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      academic_graduation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      info_company_name: {
        type: DataTypes.STRING,
        allowNull: true,
        //allowNull: (user) => user.type.toLowerCase() !== "professional",
      },
      info_position: {
        type: DataTypes.STRING,
        allowNull: true,
        //allowNull: (user) => user.type.toLowerCase() !== "professional",
      },
      info_career: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      info_skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      info_goals: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      info_interests: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      info_problematic: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      info_languages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      info_availability: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      info_contract: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      info_skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      info_goals: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      info_interests: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      info_problematic: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      info_languages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      info_availability: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      info_contract: {
        type: DataTypes.STRING,
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
        student: {
          attributes: { exclude: ["info_company_name", "info_position"] },
        },
      },
    }
  );

  User.beforeSave(async (user) => {
    if (user.changed("password"))
      user.password = await encryptPassword(user.password);
  });

  User.prototype.comparePassword = async function (password) {
    return await decryptPassword(password, this.password);
  };

  return User;
};
