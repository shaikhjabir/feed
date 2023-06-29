import { checkSchema } from "express-validator";

export const createFeedSchema = checkSchema({
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
    url: {
        in: "body",
        exists: {
            errorMessage: "url is required",
        },
        isEmpty: {
            negated: true,
            errorMessage: "url cannot be empty",
        },
        isURL: {
            errorMessage: "url is not valid"
        }
    },
    description: {
        in: "body",
        exists: {
            errorMessage: "description is required",
        },
        isEmpty: {
            negated: true,
            errorMessage: "description cannot be empty",
        },
        isLength: {
            options: { min: 2 },
            errorMessage: "description should be at least 2 characters"
        }
    }
})