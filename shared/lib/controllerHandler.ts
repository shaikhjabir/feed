import { Request, Response } from "express";
import { Transaction } from "sequelize";
import { IControllerHandlerParams } from "../interfaces/IControllerHandlerParams";
import { handleError } from "./handleError";
import { logger } from "./logger";
import { Created, download, Ok } from "./response";
import { validate } from "./validator/validator";
import { getTransaction } from "./generateControllerParams";

/**
 * Controller handler method which validates data with defined schema, call controller and
 * handles the exception.
 * @param param
 */
export const controllerHandler = ({
    schema,
    controller,
    options,
}: IControllerHandlerParams) => {
    return async (req: Request & { user: any }, res: Response) => {
        // Instantiate a trsnsaction
        let transaction: Transaction;

        try {
            // define two empty variable user, payload
            const user = {};
            let payload = {};
            // extracting values from request and storing it in payload
            payload = {
                ...(req.body ? req.body : {}),
                ...req.params,
                ...req.query,
            };
            // if the request have a user then extract the values and store it in user
            if (req.user) {
                user["uuid"] = req.user.uuid;
                user["role"] = req.user.role;
            }

            // Validate the user input
            if (schema) {
                await validate(schema, req);
            }

            let createTransaction = true;
            if (
                options &&
                options.hasOwnProperty("transaction") &&
                options.transaction === false
            ) {
                createTransaction = false;
            }
            // create a transaction if the createTransaction is true
            if (createTransaction) {
                transaction = await getTransaction();
            }

            const params = {
                args: {
                    params: req.params,
                    queryString: req.query,
                },
                input: payload,
                transaction,
                user,
                req,
                token: req.get("Authorization"),
            };
            // call the controller with the params
            const response = await controller(params);
            if (
                options &&
                options.hasOwnProperty("download") &&
                options.download === true
            ) {
                logger.debug("Meta", response);
                download(res, response);
                return;
            }

            // Return response to the client
            const method =
                req.method === "POST" && response.created ? Created : Ok;
            method(res, response.message, response.payload);
        } catch (e) {
            console.log(e);
            // if any error occured at any time of the complete flow then rollback the transaction
            if (transaction) {
                await transaction.rollback();
            }
            logger.error(e); // Log the error for debugging purpose
            handleError(e, res);
        }
    };
};
