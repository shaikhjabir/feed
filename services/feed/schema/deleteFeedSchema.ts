import { checkSchema } from "express-validator";

export const deleteFeedSchema = checkSchema({
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