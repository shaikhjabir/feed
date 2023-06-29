import * as passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../db/models";

passport.use(
  "jwt",
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SHA256_PASSWORD_SALT,
    },
    async (payload, done) => {
      const user = await User.findOne({
        where: {
          uuid: payload.uuid,
          deletedAt: null
        },
      });
      if (!user) {
        return done("Authorization failed", false);
      }


      return done(null, payload);
    }
  )
);
