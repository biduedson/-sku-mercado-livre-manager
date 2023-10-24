import { HttpRequest, HttpResponse } from "../../controller/protocols";
import { Request, Response, NextFunction } from "express";

export interface IjwtValidation {
  verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any | void>;
}
