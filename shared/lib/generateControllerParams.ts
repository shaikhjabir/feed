import { Transaction } from "sequelize";
import { sequelize } from "../db/sequelize";

/**
 * Generate controller injectable properties such as transaction and translator
 * @param req
 * @returns
 */
export const getTransaction = async (): Promise<Transaction> => {
  return await sequelize.transaction();
};
