import { checkSchema } from "express-validator";

export const addFeedsToUserSchema = checkSchema({
    userEmail: {
        in: "body",
        exists: {
            errorMessage: "userEmail is required",
        },
        isEmpty: {
            negated: true,
            errorMessage: "userEmail cannot be empty",
        },
        isEmail: {
            errorMessage: "userEmail is not a valid email"
        }
    },
    feedUUID: {
        in: "body",
        exists: {
            errorMessage: "feedUUID is required",
        },
        isEmpty: {
            negated: true,
            errorMessage: "feedUUID cannot be empty",
        },
        isUUID: {
            errorMessage: "feedUUID is not a valid UUID"
        },
        isArray: {
            options: { min: 1 },
            errorMessage: "feedUUID should be at least 1 array of string"
        }
    }
})