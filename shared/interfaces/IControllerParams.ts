import { Transaction } from "sequelize";
import { IDynamicObject } from "./IDynamicObject";
import { Request } from "express";
/**
 * This is a interface for controller parameters.
 * @param args
 * @param input - T
 * @param transaction
 * @param req
 * @param user
 */
export interface IControllerParams<T> {
  args: {
    params: IDynamicObject;
    queryString: IDynamicObject;
  };
  input?: T;
  transaction: Transaction;
  req: Request;
  user: IAuthorizedUser;
  token: string;
}

export interface IAuthorizedUser {
  uuid: string;
  role: string;
}
