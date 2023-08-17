const { Op } = require("sequelize");
const { User, Company, Admin } = require("../db");

const findAccount = async (prop) => {
  try {
    const foundedCompany = await Company.findOne({
      where: { [Op.or]: [{ email: prop }, { username: prop }] },
    });
    const foundedUser = await User.findOne({
      where: { [Op.or]: [{ email: prop }, { username: prop }] },
    });
    const foundedAdmin = await Admin.findOne({
      where: { username: prop },
    });
    // console.log(`findAccount: ${foundedCompany}`);
    // console.log(`findAccount: ${foundedUser}`);
    // if (!foundedCompany && !foundedUser) return;
    return foundedUser || foundedCompany || foundedAdmin;
  } catch (error) {
    throw error;
  }
};

const findAccountById = async (id) => {
  try {
    const foundedCompany = await Company.findByPk(id);
    const foundedUser = await User.findByPk(id);
    const foundedAdmin = await Admin.findByPk(id);
    // console.log(`findAccount: ${foundedCompany}`);
    // console.log(`findAccount: ${foundedUser}`);
    // if (!foundedCompany && !foundedUser) return;
    return foundedUser || foundedCompany || foundedAdmin;
  } catch (error) {
    throw error;
  }
};

module.exports = { findAccount, findAccountById };
