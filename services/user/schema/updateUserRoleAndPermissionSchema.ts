import { checkSchema } from "express-validator";

export const updateUserRoleAndPermissionSchema = checkSchema({

    email: {
        in: "body",
        exists: {
            errorMessage: "role is required",
        },
        isEmpty: {
            negated: true,
            errorMessage: "role cannot be empty",
        },
        isEmail: {
            errorMessage: "not valid email address"
        }
    },
    canDeleteFeed: {
        in: "body",
        exists: {
            errorMessage: "role is required",
        },
        isEmpty: {
            negated: true,
            errorMessage: "role cannot be empty",
        },
        isBoolean: {
            errorMessage: "boolean is required"
        }
    }


})