import { checkSchema } from "express-validator";

export const loginUserSchema = checkSchema({
    email: {
        in: "body",
        exists: {
            errorMessage: "email is required",
        },
        isEmpty: {
            negated: true,
            errorMessage: "email cannot be empty",
        },
        isEmail: {
            errorMessage: "email is not valid"
        }
    },
    password: {
        in: "body",
        exists: {
            errorMessage: "password is required",
        },
        isEmpty: {
            negated: true,
            errorMessage: "password cannot be empty",
        },
        isLength: {
            options: { min: 8 },
            errorMessage: "password should be at least 8 characters"
        }
    }
})