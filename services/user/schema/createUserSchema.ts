import { checkSchema } from "express-validator";

export const createUserSchema = checkSchema({
    name: {
        in: "body",
        exists: {
            errorMessage: "name is required",
        },
        isEmpty: {
            negated: true,
            errorMessage: "name cannot be empty",
        },
        isLength: {
            options: { min: 2 },
            errorMessage: "name should be at least 2 characters"
        }
    },
    role: {
        in: "body",
        exists: {
            errorMessage: "role is required",
        },
        isEmpty: {
            negated: true,
            errorMessage: "role cannot be empty",
        },
        isIn: {
            options: [["Super Admin","Admin", "Basic"]],
            errorMessage: "role should be Super Admin, Admin, Basic"
        }
    },
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