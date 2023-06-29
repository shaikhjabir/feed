import { NextFunction, Request, Response } from "express";
import * as passport from "passport";
import { ExtractJwt } from "passport-jwt";
import { UnAuthorized, BadRequest, Forbidden } from "../lib/exceptionResponse";
import "../strategies/passportJwtStrategy";
import { TOKEN_NOT_FOUND } from "../constants/httpErrorMessages";

/**
 * Method which authenticates a user based on the jwt header
 * @param req
 * @param res
 * @param next
 */
export default function authenticate(
    req: Request & { user: any },
    res: Response,
    next: NextFunction
) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    // If token is not found, we assume this might be a guest user.
    // The authorization will be checked by the middleware
    if (!token) {
        BadRequest(res, TOKEN_NOT_FOUND);
        return;
    }
    passport.authenticate("jwt", { session: false }, (err, user: any) => {
        // logger.debug("Authenticate-middleware -> User -> ", user)

        if (err) {
            Forbidden(res, err);
            return;
        }

        // un-authorize if the user is not found or not active
        if (!user) {
            UnAuthorized(res);
            return;
        }



        req.user = user;
        next();
    })(req, res, next);
}
