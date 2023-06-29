import { Response } from "express";

/**
 * Not Found Response
 * @param res
 */
export function NotFound(res: Response) {
  return HttpStatus(res, 404);
}

/**
 * Un authorized Response
 * @param res
 */
export function UnAuthorized(res: Response) {
  return HttpStatus(res, 401);
}

/**
 * Bad Request
 * @param res
 * @param message
 */
export function BadRequest(res: Response, message: string = "BAD_REQUEST") {
  return HttpStatus(res, 400, { message });
}

/**
 * Un Processable entity Response
 * @param res
 * @param errors
 */
export function UnProcessableEntity(res: Response, errors: any) {
  return HttpStatus(res, 422, errors);
}

/**
 * Created Response
 * @param res
 * @param data
 */
export function Created(res: Response, data: any) {
  return HttpStatus(res, 201, data);
}

/**
 * Ok Response
 * @param res
 * @param data
 */
export function Ok(res: Response, data: any = {}) {
  return HttpStatus(res, 200, data);
}

/**
 * No Content Response
 * @param res
 */
export function NoContent(res: Response) {
  return HttpStatus(res, 204);
}

/**
 * Forbidden Response
 * @param res
 */
export function Forbidden(res: Response, info?) {
  return HttpStatus(res, 403, info);
}

/**
 * Internal server error Response
 * @param res
 */
export function InternalServerError(res: Response, err?) {
  if (err) {
    // tslint:disable-next-line: no-console
    console.log("ISE", err);
  }
  return HttpStatus(res, 500);
}

/**
 * HTTP Status
 * @param res
 * @param code
 * @param info
 */
export function HttpStatus(res: Response, code: number = 200, info: any = {}) {
  return res.status(code).send(info);
}
