// const { User, Company } = require("../db");
// const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const { JWT_KEY } = require("../../config");
const { findAccountById } = require("../helpers/findAccount");

//--------------------Auth SingUp PASSPORT--------------------//
// passport.use(
//   "singup",
//   new LocalStrategy({ passReqToCallback: true }, async (req, done) => {
//     const { email, password } = req.body;
//   })
// );

//---------------------Auth JWT PASSPORT---------------------//
const bearerTokenExtractor = (req) => {
  if (req) {
    const authHeader = req.headers.authorization;
    // console.log(authHeader.split(" ")[1]);
    if (authHeader) return authHeader.split(" ")[1];
    return null;
  }
  return null;
};

const cookieExtractor = (req) => {
  if (req && req.cookies) {
    return req.cookies.token;
  }
  return null;
};

const options = {};
options.jwtFromRequest = cookieExtractor;
options.secretOrKey = JWT_KEY;

passport.use(
  new JWTStrategy(options, async function (payload, done) {
    try {
      // console.log(payload.id);
      const foundedAccount = await findAccountById(payload.id);
      // console.log(`passport-config: ${foundedAccount}`);
      if (foundedAccount) return done(null, foundedAccount);
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);
//-----------------------------------------------------------//

module.exports = passport;
