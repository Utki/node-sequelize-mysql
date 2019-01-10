const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Setup = require("../secret/secret");
const db = require("../config/config");
const UserInfo = db.users;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Setup.secret;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      let expirationDate = new Date(jwtPayload.exp * 1000);
      if (expirationDate < new Date()) {
        return done(null, false);
      }
      UserInfo.findByPk(jwtPayload.userId)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

//Trial 1
// module.exports = passport => {
//   passport.use(
//     new JwtStrategy(opts, (jwt_payload, done) => {
//       //console.log(jwt_payload.userId);
//       UserInfo.findByPk(jwt_payload.userId)
//         .then(user => {
//           if (user) {
//             return done(null, user);
//           }
//           return done(null, false);
//         })
//         .catch(err => console.log(err));
//     })
//   );
// };
