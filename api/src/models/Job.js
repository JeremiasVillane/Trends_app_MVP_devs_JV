const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Job = sequelize.define(
    "job",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      companyId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      jobName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creationDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true,
        },
      },
      closingDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: true,
        },
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      levelRequired: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studyArea: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      experienceRequired: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      industry: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      benefits: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      skillsRequired: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      jobDescription: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      jobGoal: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      languagesRequired: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      availability: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contractOffered: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Job;
};
