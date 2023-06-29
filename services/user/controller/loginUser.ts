import { IControllerParams } from "../../../shared/interfaces/IControllerParams";
import { ILogin } from "../interfaces/ILogin";
import { sign } from "jsonwebtoken";
import { User } from "../../../shared/db/models";
import { generateSha256Password, } from "../../../shared/helpers/generateSha256Password";
import { HttpNotFound } from "../../../shared/lib/exceptions/HttpNotFound";
import {
    WRONG_USER_OR_PASSWORD,
} from "../../../shared/constants/httpErrorMessages";
import { SUCCESSFUL } from "../../../shared/constants/httpSuccessMessages";

export const loginUser = async (params: IControllerParams<ILogin>) => {
    const { email, password } = params.input;

    const user: any = await User.findOne({
        where: {
            email,
            password: generateSha256Password(password)
        },
    });

    if (!user)
        throw new HttpNotFound(WRONG_USER_OR_PASSWORD)

    const token = sign({
        uuid: user.UUID,
        role: user.role
    }, process.env.SHA256_PASSWORD_SALT, { expiresIn: process.env.TOKEN_LIFE });


    return {
        message: SUCCESSFUL, payload: {
            token
        },
    };
};
